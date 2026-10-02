import React, { useState } from 'react';
import {
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  ArrowLeft,
  PackageCheck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage({ onBackToHome, onViewOrders }) {
  const { cartItems, subtotal, shippingFee, finalTotal, clearCart } = useCart();
  const { user } = useAuth();

  // Form State
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user ? user.name : '',
    address: '42 Park Street, Flat 2B',
    city: 'New Delhi',
    postalCode: '110001',
    country: 'India',
    phone: '+91 9876543210',
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI / Net Banking');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Order to backend API
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacingOrder(true);
    setErrorMessage(null);

    try {
      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          imageUrl: item.imageUrl,
          price: item.price,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        shippingPrice: shippingFee,
        totalPrice: finalTotal,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user?.token ? `Bearer ${user.token}` : '',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      setOrderSuccess(data);
      clearCart();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  // If order was successfully placed, render Order Confirmation
  if (orderSuccess) {
    return (
      <div className="container" style={{ padding: '40px 16px', maxWidth: '680px' }}>
        <div
          className="animate-fade"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '36px 28px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <CheckCircle size={44} color="#10b981" />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
            Order Placed Successfully!
          </h2>

          <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '20px' }}>
            Thank you for shopping with PrimeKart. Your package will be on its way soon.
          </p>

          <div
            style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'left',
              marginBottom: '24px',
              border: '1px solid #e5e7eb',
              fontSize: '0.9rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#6b7280' }}>Order ID:</span>
              <strong style={{ color: '#111827' }}>#{orderSuccess._id || 'ORD-91823'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#6b7280' }}>Estimated Delivery:</span>
              <strong style={{ color: '#16a34a' }}>
                {orderSuccess.estimatedDelivery || 'In 3-4 Business Days'}
              </strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#6b7280' }}>Payment Method:</span>
              <strong>{orderSuccess.paymentMethod}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Total Paid:</span>
              <strong style={{ color: '#b12704', fontSize: '1rem' }}>
                ${orderSuccess.totalPrice?.toLocaleString()}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={onViewOrders}
              style={{
                backgroundColor: '#ffd814',
                color: '#0f1111',
                padding: '12px 24px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: '1px solid #fcd200',
              }}
            >
              View My Orders
            </button>

            <button
              onClick={onBackToHome}
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '12px 24px',
                borderRadius: '24px',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, prompt user to go back
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 16px', textAlign: 'center' }}>
        <h2>Your shopping cart is empty</h2>
        <p style={{ color: '#6b7280', margin: '12px 0 20px' }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={onBackToHome}
          style={{
            backgroundColor: '#2874f0',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: '20px',
            fontWeight: 700,
          }}
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 16px', maxWidth: '1080px' }}>
      {/* Back button */}
      <button
        onClick={onBackToHome}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'transparent',
          color: '#2874f0',
          fontWeight: 600,
          fontSize: '0.9rem',
          marginBottom: '20px',
        }}
      >
        <ArrowLeft size={18} />
        <span>Back to Shopping</span>
      </button>

      <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '24px', color: '#111827' }}>
        Checkout & Secure Payment
      </h1>

      {errorMessage && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {/* Left Column: Delivery Address & Payment Method */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Step 1: Address Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#2874f0',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  1
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                  Delivery Address
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                    Street Address & House / Flat No.
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                    Postal Code (Pincode)
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }}>
                    Phone Number (for delivery updates)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#2874f0',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  2
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                  Select Payment Method
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  {
                    id: 'UPI / Net Banking',
                    icon: <Smartphone size={18} color="#2563eb" />,
                    title: 'UPI / Net Banking (GPay, PhonePe, Paytm, QR)',
                    badge: 'Instant & Fast',
                  },
                  {
                    id: 'Credit or Debit Card',
                    icon: <CreditCard size={18} color="#16a34a" />,
                    title: 'Credit or Debit Card (Visa, MasterCard, RuPay)',
                    badge: 'Extra 5% Cashback',
                  },
                  {
                    id: 'Cash on Delivery',
                    icon: <Banknote size={18} color="#f59e0b" />,
                    title: 'Cash on Delivery (Pay upon arrival)',
                    badge: 'Zero upfront risk',
                  },
                ].map((m) => (
                  <label
                    key={m.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: paymentMethod === m.id ? '2px solid #2874f0' : '1px solid #e5e7eb',
                      backgroundColor: paymentMethod === m.id ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={paymentMethod === m.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {m.icon}
                    <div style={{ flex: 1, fontSize: '0.88rem', fontWeight: 600 }}>
                      {m.title}
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {m.badge}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: '90px',
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
                Order Summary ({cartItems.length} items)
              </h3>

              {/* Items Mini List */}
              <div
                style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '16px',
                }}
              >
                {cartItems.map((item) => (
                  <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px' }}
                    />
                    <div style={{ flex: 1, fontSize: '0.8rem' }}>
                      <p style={{ margin: 0, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                        {item.name}
                      </p>
                      <span style={{ color: '#6b7280' }}>Qty: {item.qty}</span>
                    </div>
                    <strong style={{ fontSize: '0.85rem' }}>
                      ${(item.price * item.qty).toLocaleString()}
                    </strong>
                  </div>
                ))}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '14px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Items Subtotal:</span>
                <strong>${subtotal.toLocaleString()}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Delivery Fee:</span>
                <strong style={{ color: shippingFee === 0 ? '#16a34a' : '#111827' }}>
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                </strong>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '12px',
                  marginBottom: '20px',
                }}
              >
                <span>Order Total:</span>
                <span style={{ color: '#b12704' }}>${finalTotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={placingOrder}
                style={{
                  width: '100%',
                  backgroundColor: '#ffd814',
                  color: '#0f1111',
                  padding: '13px',
                  borderRadius: '24px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: '1px solid #fcd200',
                  boxShadow: '0 2px 5px rgba(213,217,217,0.5)',
                  cursor: placingOrder ? 'not-allowed' : 'pointer',
                  opacity: placingOrder ? 0.7 : 1,
                }}
              >
                {placingOrder ? 'Processing Order...' : 'Place Your Order'}
              </button>

              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem',
                  color: '#4b5563',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={16} color="#16a34a" />
                <span>256-Bit SSL Encrypted & 100% Purchase Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
