import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onSelectProduct }) {
  const { addToCart } = useCart();

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
        border: '1px solid #f0f0f0',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)';
      }}
    >
      {/* Top Discount Tag or Deal Badge */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {product.isDealOfDay && (
          <span className="badge-deal">Deal of the Day</span>
        )}
        {product.discountPercentage > 0 && (
          <span className="badge-discount">{product.discountPercentage}% OFF</span>
        )}
      </div>

      {/* Product Image */}
      <div
        onClick={() => onSelectProduct(product)}
        style={{
          height: '210px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Brand & Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#878787', marginBottom: '4px' }}>
          <span style={{ fontWeight: 600, textTransform: 'uppercase' }}>{product.brand}</span>
          <span>{product.category}</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onSelectProduct(product)}
          style={{
            fontSize: '0.92rem',
            fontWeight: 600,
            lineHeight: 1.35,
            color: '#212121',
            margin: '0 0 8px 0',
            cursor: 'pointer',
            height: '2.7em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Star Rating & Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <div className="badge-rating">
            <span>{product.rating}</span>
            <Star size={11} fill="#ffffff" stroke="none" />
          </div>
          <span style={{ fontSize: '0.75rem', color: '#878787' }}>
            ({product.numReviews.toLocaleString()} ratings)
          </span>
        </div>

        {/* Pricing Section */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827' }}>
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={{ fontSize: '0.85rem', color: '#878787', textDecoration: 'line-through' }}>
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Delivery / Prime Promise */}
        <div style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 600, marginBottom: '14px' }}>
          ✓ FREE Delivery by Tomorrow
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => addToCart(product, 1)}
            style={{
              flex: 1,
              backgroundColor: '#ffd814',
              color: '#0f1111',
              padding: '9px 12px',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: '1px solid #fcd200',
              boxShadow: '0 2px 5px rgba(213, 217, 217, 0.5)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7ca00')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffd814')}
          >
            <ShoppingCart size={15} />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => onSelectProduct(product)}
            style={{
              backgroundColor: '#f3f4f6',
              color: '#374151',
              padding: '8px 12px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e5e7eb',
            }}
            title="Quick Preview"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
