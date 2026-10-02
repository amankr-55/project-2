import Order from '../models/Order.js';
import { isMongoConnected } from '../config/db.js';

// In-memory orders store for demo / when MongoDB is not connected
let localOrders = [
  {
    _id: 'ord_sample_98234',
    customerName: 'Rahul Sharma',
    customerEmail: 'user@eshop.com',
    orderItems: [
      {
        name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        qty: 1,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        price: 348,
      },
    ],
    shippingAddress: {
      fullName: 'Rahul Sharma',
      address: '221B Baker Street, Flat 4B',
      city: 'Mumbai',
      postalCode: '400001',
      country: 'India',
      phone: '+91 9876543210',
    },
    paymentMethod: 'UPI / Net Banking',
    itemsPrice: 348,
    shippingPrice: 0,
    totalPrice: 348,
    isPaid: true,
    status: 'Shipped',
    estimatedDelivery: 'Mon, Oct 06 2026',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private / Authenticated
 */
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items specified' });
    }

    const orderData = {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      customerName: req.user ? req.user.name : shippingAddress.fullName,
      customerEmail: req.user ? req.user.email : 'guest@eshop.com',
      user: req.user ? req.user._id : null,
      isPaid: paymentMethod !== 'Cash on Delivery',
      paidAt: paymentMethod !== 'Cash on Delivery' ? new Date() : null,
      status: 'Order Placed',
      estimatedDelivery: new Date(Date.now() + 4 * 86400000).toDateString(),
    };

    if (isMongoConnected) {
      const order = await Order.create(orderData);
      return res.status(201).json(order);
    }

    // In-memory fallback
    const newOrder = {
      _id: 'ord_' + Math.floor(100000 + Math.random() * 900000),
      ...orderData,
      createdAt: new Date().toISOString(),
    };
    localOrders.unshift(newOrder);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
export const getMyOrders = async (req, res) => {
  try {
    if (isMongoConnected) {
      const orders = await Order.find({
        $or: [{ user: req.user._id }, { customerEmail: req.user.email }],
      }).sort({ createdAt: -1 });
      return res.json(orders);
    }

    const myOrders = localOrders.filter(
      (o) =>
        String(o.user) === String(req.user._id) ||
        o.customerEmail.toLowerCase() === req.user.email.toLowerCase()
    );
    res.json(myOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user orders', error: error.message });
  }
};

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getAllOrders = async (req, res) => {
  try {
    if (isMongoConnected) {
      const orders = await Order.find({}).sort({ createdAt: -1 });
      return res.json(orders);
    }
    res.json(localOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving all orders', error: error.message });
  }
};

/**
 * @desc    Update order status (Admin)
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (isMongoConnected) {
      const order = await Order.findById(id);
      if (order) {
        order.status = status;
        if (status === 'Delivered') {
          order.deliveredAt = new Date();
        }
        const updated = await order.save();
        return res.json(updated);
      }
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = localOrders.find((o) => String(o._id) === String(id));
    if (order) {
      order.status = status;
      return res.json(order);
    }
    res.status(404).json({ message: 'Order not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};
