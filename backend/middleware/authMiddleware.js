import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isMongoConnected } from '../config/db.js';

// Verify JWT token for protected routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey_change_in_production_12345');

      if (isMongoConnected) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback user context
        req.user = {
          _id: decoded.id,
          name: decoded.name || 'Demo User',
          email: decoded.email || 'user@example.com',
          isAdmin: decoded.isAdmin || false,
        };
      }

      next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Check if user is an admin
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
