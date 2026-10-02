import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalItemsCount,
    subtotal,
    totalSavings,
    shippingFee,
    finalTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(2px)',
        zIndex: 600,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 25px rgba(0,0,0,0.2)',
          animation: 'slideLeft 0.25s ease-out forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#131921',
            color: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#ff9900" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
              Shopping Cart ({totalItemsCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              padding: '4px',
              borderRadius: '4px',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Alert Banner */}
        <div
          style={{
            backgroundColor: subtotal >= 100 ? '#ecfdf5' : '#eff6ff',
            padding: '10px 16px',
            fontSize: '0.8rem',
            borderBottom: '1px solid #e5e7eb',
            color: subtotal >= 100 ? '#047857' : '#1d4ed8',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {subtotal >= 100 ? (
            <span>🎉 Your order qualifies for <strong>FREE Delivery!</strong></span>
          ) : (
            <span>
              Add <strong>${(100 - subtotal).toLocaleString()}</strong> more for FREE Delivery!
            </span>
          )}
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {cartItems.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShoppingBag size={34} color="#9ca3af" />
              </div>
              <h4 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                Explore our catalog and add great deals to your cart!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  backgroundColor: '#ffd814',
                  color: '#111',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  padding: '9px 20px',
                  borderRadius: '20px',
                  border: '1px solid #fcd200',
                  marginTop: '8px',
                }}
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #f0f0f0',
                    backgroundColor: '#fafafa',
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: '68px',
                      height: '68px',
                      objectFit: 'contain',
                      borderRadius: '6px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      padding: '4px',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        margin: '0 0 4px 0',
                        color: '#1f2937',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>
                        ${item.price.toLocaleString()}
                      </span>
                      {item.originalPrice > item.price && (
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                          ${item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#ffffff',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item._id, item.qty - 1)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ padding: '0 10px', fontSize: '0.85rem', fontWeight: 700 }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.qty + 1)}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Button */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid #e5e7eb',
              backgroundColor: '#fafafa',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ color: '#6b7280' }}>Items Subtotal:</span>
              <strong style={{ color: '#111827' }}>${subtotal.toLocaleString()}</strong>
            </div>

            {totalSavings > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: '#16a34a' }}>Your Total Savings:</span>
                <strong style={{ color: '#16a34a' }}>-${totalSavings.toLocaleString()}</strong>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '12px' }}>
              <span style={{ color: '#6b7280' }}>Delivery Fee:</span>
              <strong style={{ color: shippingFee === 0 ? '#16a34a' : '#111827' }}>
                {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
              </strong>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.15rem',
                fontWeight: 800,
                borderTop: '1px solid #e5e7eb',
                paddingTop: '10px',
                marginBottom: '16px',
              }}
            >
              <span>Total Amount:</span>
              <span style={{ color: '#b12704' }}>${finalTotal.toLocaleString()}</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                if (onProceedToCheckout) onProceedToCheckout();
              }}
              style={{
                width: '100%',
                backgroundColor: '#ffd814',
                color: '#0f1111',
                padding: '13px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: '1px solid #fcd200',
                boxShadow: '0 2px 5px rgba(213,217,217,0.5)',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
