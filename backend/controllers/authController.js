import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { isMongoConnected } from '../config/db.js';

// Pre-seeded local users for instant demo without MongoDB setup
let localUsers = [
  {
    _id: 'user_admin_01',
    name: 'Admin Store Manager',
    email: 'admin@eshop.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    _id: 'user_demo_02',
    name: 'Rahul Sharma',
    email: 'user@eshop.com',
    passwordHash: bcrypt.hashSync('user123', 10),
    isAdmin: false,
  },
];

// Helper to generate JWT Token
const generateToken = (id, name, email, isAdmin) => {
  return jwt.sign(
    { id, name, email, isAdmin },
    process.env.JWT_SECRET || 'supersecretkey_change_in_production_12345',
    { expiresIn: '30d' }
  );
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (isMongoConnected) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        isAdmin: false,
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.name, user.email, user.isAdmin),
      });
    }

    // In-memory fallback
    const existing = localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const newUser = {
      _id: 'user_' + Date.now(),
      name,
      email: email.toLowerCase(),
      passwordHash: bcrypt.hashSync(password, 10),
      isAdmin: false,
    };
    localUsers.push(newUser);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id, newUser.name, newUser.email, newUser.isAdmin),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    if (isMongoConnected) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id, user.name, user.email, user.isAdmin),
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // In-memory fallback check
    const user = localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.name, user.email, user.isAdmin),
      });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
};
