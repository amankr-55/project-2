import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage({ onBackToHome }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: {
            Authorization: user?.token ? `Bearer ${user.token}` : '',
          },
        });
        if (!res.ok) throw new Error('Could not fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Stepper helper
  const getStepIndex = (status) => {
    switch (status) {
      case 'Order Placed':
        return 1;
      case 'Shipped':
        return 2;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="container" style={{ padding: '24px 16px', maxWidth: '960px' }}>
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
        <span>Back to Store</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#111827' }}>
            Your Orders & Shipments
          </h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
            Track and view previous purchases
          </p>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
          <p>Loading your orders...</p>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
          }}
        >
          {error}
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '48px 24px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <Package size={48} color="#9ca3af" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No orders found</h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
            Looks like you haven't placed an order yet. Check out our latest deals!
          </p>
          <button
            onClick={onBackToHome}
            style={{
              backgroundColor: '#ffd814',
              color: '#111',
              padding: '10px 24px',
              borderRadius: '20px',
              fontWeight: 700,
              border: '1px solid #fcd200',
            }}
          >
            Start Shopping
          </button>
        </div>
      )}

      {/* Orders List */}
      {!loading && orders.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map((order) => {
            const step = getStepIndex(order.status);
            return (
              <div
                key={order._id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  border: '1px solid #e5e7eb',
                }}
              >
                {/* Order Top Meta */}
                <div
                  style={{
                    backgroundColor: '#f9fafb',
                    padding: '14px 20px',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ color: '#6b7280', display: 'block', fontSize: '0.75rem' }}>ORDER PLACED</span>
                      <strong style={{ color: '#111827' }}>
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today'}
                      </strong>
                    </div>

                    <div>
                      <span style={{ color: '#6b7280', display: 'block', fontSize: '0.75rem' }}>TOTAL AMOUNT</span>
                      <strong style={{ color: '#111827' }}>${order.totalPrice?.toLocaleString()}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#6b7280', display: 'block', fontSize: '0.75rem' }}>SHIP TO</span>
                      <strong style={{ color: '#2563eb' }}>
                        {order.shippingAddress?.fullName || order.customerName}
                      </strong>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#6b7280', display: 'block', fontSize: '0.75rem' }}>ORDER # {order._id}</span>
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '3px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor:
                          order.status === 'Delivered'
                            ? '#dcfce7'
                            : order.status === 'Shipped'
                            ? '#dbeafe'
                            : '#fef3c7',
                        color:
                          order.status === 'Delivered'
                            ? '#15803d'
                            : order.status === 'Shipped'
                            ? '#1e40af'
                            : '#b45309',
                      }}
                    >
                      ● {order.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '5%',
                        right: '5%',
                        height: '4px',
                        backgroundColor: '#e5e7eb',
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          backgroundColor: '#16a34a',
                          width: `${((step - 1) / 3) * 100}%`,
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>

                    {['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'].map((label, idx) => {
                      const isCompleted = idx + 1 <= step;
                      return (
                        <div
                          key={label}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            zIndex: 2,
                            width: '90px',
                          }}
                        >
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: isCompleted ? '#16a34a' : '#ffffff',
                              border: isCompleted ? '2px solid #16a34a' : '2px solid #d1d5db',
                              color: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '6px',
                            }}
                          >
                            {isCompleted && <CheckCircle2 size={14} color="#fff" />}
                          </div>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: isCompleted ? 700 : 500,
                              color: isCompleted ? '#16a34a' : '#9ca3af',
                              textAlign: 'center',
                            }}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items in this Order */}
                <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827' }}>
                    Arriving by {order.estimatedDelivery || 'in 3 days'}
                  </div>

                  {order.orderItems?.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '10px 0',
                        borderBottom: idx !== order.orderItems.length - 1 ? '1px solid #f3f4f6' : 'none',
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{
                          width: '70px',
                          height: '70px',
                          objectFit: 'contain',
                          borderRadius: '6px',
                          backgroundColor: '#fafafa',
                          border: '1px solid #e5e7eb',
                          padding: '4px',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.92rem', fontWeight: 600, margin: '0 0 4px', color: '#1f2937' }}>
                          {item.name}
                        </h4>
                        <div style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                          Qty: <strong>{item.qty}</strong> &bull; Price: <strong>${item.price.toLocaleString()}</strong>
                        </div>
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#111827' }}>
                        ${(item.price * item.qty).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
