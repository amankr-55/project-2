import React, { useState } from 'react';
import { X, Star, ShoppingCart, Zap, Check, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailsModal({ product, onClose, onBuyNow }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onClose();
    if (onBuyNow) onBuyNow();
  };

  const savings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(3px)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-fade"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative',
          padding: '28px',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: '#f3f4f6',
            color: '#4b5563',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <X size={20} />
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Left Column: Image Preview */}
          <div
            style={{
              backgroundColor: '#fafafa',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb',
              minHeight: '340px',
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '380px',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>

          {/* Right Column: Product Info */}
          <div>
            {/* Category & Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {product.category}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>
                Brand: {product.brand}
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#111827',
                lineHeight: 1.3,
                marginBottom: '12px',
              }}
            >
              {product.name}
            </h2>

            {/* Ratings & Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div className="badge-rating">
                <span>{product.rating}</span>
                <Star size={12} fill="#fff" stroke="none" />
              </div>
              <span style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 600 }}>
                {product.numReviews.toLocaleString()} verified ratings
              </span>
              <span style={{ color: '#d1d5db' }}>|</span>
              <span style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: 600 }}>
                Flipkart & Amazon Assured
              </span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0' }} />

            {/* Pricing Details */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1.1rem', color: '#6b7280', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span
                    style={{
                      color: '#16a34a',
                      fontWeight: 800,
                      fontSize: '1rem',
                    }}
                  >
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p style={{ color: '#15803d', fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                  You save: ${savings.toLocaleString()} (inclusive of all taxes)
                </p>
              )}
            </div>

            {/* In-Stock Indicator */}
            <div style={{ marginBottom: '16px' }}>
              {product.countInStock > 0 ? (
                <span
                  style={{
                    color: product.countInStock < 10 ? '#dc2626' : '#16a34a',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  {product.countInStock < 10
                    ? `Only ${product.countInStock} left in stock - order soon.`
                    : 'In Stock (Ready to dispatch)'}
                </span>
              ) : (
                <span style={{ color: '#dc2626', fontWeight: 700 }}>Currently Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '16px' }}>
              {product.description}
            </p>

            {/* Key Features List */}
            {product.features && product.features.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>
                  Key Features & Highlights:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {product.features.map((feat, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '0.85rem',
                        color: '#374151',
                      }}
                    >
                      <Check size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector & Purchase Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Qty:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    backgroundColor: '#f9fafb',
                    fontWeight: 600,
                  }}
                >
                  {[...Array(Math.min(10, product.countInStock || 5)).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  minWidth: '160px',
                  backgroundColor: '#ffd814',
                  color: '#0f1111',
                  padding: '12px 20px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid #fcd200',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                style={{
                  flex: 1,
                  minWidth: '160px',
                  backgroundColor: '#ffa41c',
                  color: '#0f1111',
                  padding: '12px 20px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid #ff8f00',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <Zap size={18} />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Guarantees Strip */}
            <div
              style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: '#4b5563',
              }}
            >
              <div>
                <Truck size={18} color="#2563eb" style={{ margin: '0 auto 4px' }} />
                <div>Free Delivery</div>
              </div>
              <div>
                <RefreshCw size={18} color="#16a34a" style={{ margin: '0 auto 4px' }} />
                <div>7 Days Return</div>
              </div>
              <div>
                <ShieldCheck size={18} color="#d97706" style={{ margin: '0 auto 4px' }} />
                <div>1 Year Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
