import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      index: true,
    },
    brand: {
      type: String,
      default: 'Generic',
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: function () {
        return Math.round(this.price * 1.3); // default 30% markup if not specified
      },
    },
    discountPercentage: {
      type: Number,
      default: function () {
        if (this.originalPrice > this.price) {
          return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
        }
        return 0;
      },
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 120,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 10,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    isDealOfDay: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
