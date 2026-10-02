import Product from '../models/Product.js';
import { sampleProducts } from '../data/sampleProducts.js';
import { isMongoConnected } from '../config/db.js';

// In-memory data store used if MongoDB is not connected
let localProducts = [...sampleProducts];

// Auto-seed database if MongoDB is connected and empty
export const seedProductsIfEmpty = async () => {
  if (!isMongoConnected) return;
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(sampleProducts);
      console.log(' Sample products seeded successfully into MongoDB!');
    }
  } catch (error) {
    console.error('Error seeding products:', error.message);
  }
};

/**
 * @desc    Fetch all products with optional filters, search, and sort
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  try {
    const { keyword, category, sort, minPrice, maxPrice } = req.query;

    if (isMongoConnected) {
      // Build MongoDB query
      let query = {};

      if (keyword) {
        query.$or = [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { brand: { $regex: keyword, $options: 'i' } },
        ];
      }

      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      let mongoQuery = Product.find(query);

      // Sorting
      if (sort === 'price-low') {
        mongoQuery = mongoQuery.sort({ price: 1 });
      } else if (sort === 'price-high') {
        mongoQuery = mongoQuery.sort({ price: -1 });
      } else if (sort === 'rating') {
        mongoQuery = mongoQuery.sort({ rating: -1 });
      } else {
        mongoQuery = mongoQuery.sort({ createdAt: -1 });
      }

      const products = await mongoQuery;
      return res.json(products);
    }

    // In-memory fallback filtering
    let results = [...localProducts];

    if (keyword) {
      const q = keyword.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      results = results.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice) {
      results = results.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter((p) => p.price <= Number(maxPrice));
    }

    // Sorting
    if (sort === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products', error: error.message });
  }
};

/**
 * @desc    Fetch single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const product = await Product.findById(id);
      if (product) return res.json(product);
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = localProducts.find((p) => String(p._id) === String(id));
    if (product) {
      return res.json(product);
    }
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching product details', error: error.message });
  }
};

/**
 * @desc    Create a new product (Admin)
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      originalPrice,
      description,
      imageUrl,
      brand,
      category,
      countInStock,
      features,
    } = req.body;

    const discountPercentage =
      originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const productData = {
      name: name || 'Sample Product Name',
      price: Number(price) || 99,
      originalPrice: Number(originalPrice) || Number(price) || 129,
      discountPercentage,
      description: description || 'High quality product designed for everyday comfort and utility.',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      brand: brand || 'Brand',
      category: category || 'Electronics',
      countInStock: Number(countInStock) || 10,
      rating: 4.5,
      numReviews: 1,
      features: Array.isArray(features) ? features : [features].filter(Boolean),
    };

    if (isMongoConnected) {
      const created = await Product.create(productData);
      return res.status(201).json(created);
    }

    const newProduct = {
      _id: 'prod_' + Date.now(),
      ...productData,
      createdAt: new Date().toISOString(),
    };
    localProducts.unshift(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

/**
 * @desc    Delete a product (Admin)
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected) {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      await product.deleteOne();
      return res.json({ message: 'Product removed successfully' });
    }

    const initialLen = localProducts.length;
    localProducts = localProducts.filter((p) => String(p._id) !== String(id));
    if (localProducts.length === initialLen) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};
