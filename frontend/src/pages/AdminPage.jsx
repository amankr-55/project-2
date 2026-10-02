import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  PlusCircle,
  Package,
  DollarSign,
  TrendingUp,
  Trash2,
  CheckCircle,
  Truck,
  ArrowLeft,
  Upload,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminPage({ onBackToHome }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Add Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Mobiles',
    brand: '',
    price: '',
    originalPrice: '',
    description: '',
    imageUrl: '',
    countInStock: '15',
    features: '',
  });

  const categories = ['Mobiles', 'Laptops', 'Audio', 'Watches', 'Fashion', 'Home'];

  // Fetch admin products and orders
  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders', {
          headers: {
            Authorization: user?.token ? `Bearer ${user.token}` : '',
          },
        }),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        setOrders(ordData);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // Handle Create Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        price: Number(newProduct.price),
        originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price),
        countInStock: Number(newProduct.countInStock),
        features: newProduct.features.split(',').map((f) => f.trim()).filter(Boolean),
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user?.token ? `Bearer ${user.token}` : '',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFeedbackMsg('Product created successfully!');
        setNewProduct({
          name: '',
          category: 'Mobiles',
          brand: '',
          price: '',
          originalPrice: '',
          description: '',
          imageUrl: '',
          countInStock: '15',
          features: '',
        });
        loadData();
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      setFeedbackMsg('Failed to create product: ' + err.message);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: user?.token ? `Bearer ${user.token}` : '',
        },
      });
      if (res.ok) {
        setFeedbackMsg('Product deleted successfully');
        loadData();
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      setFeedbackMsg('Failed to delete product');
    }
  };

  // Update Order Status
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user?.token ? `Bearer ${user.token}` : '',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setFeedbackMsg(`Order #${orderId} status changed to ${newStatus}`);
        loadData();
        setTimeout(() => setFeedbackMsg(''), 3000);
      }
    } catch (err) {
      setFeedbackMsg('Failed to update status');
    }
  };

  // Calculations for Admin Analytics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);

  return (
    <div className="container" style={{ padding: '24px 16px' }}>
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
          marginBottom: '16px',
        }}
      >
        <ArrowLeft size={18} />
        <span>Back to Store</span>
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#111827' }}>
            Seller Central & Admin Dashboard
          </h1>
          <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
            Manage catalog, inventory, and order fulfilment
          </p>
        </div>
      </div>

      {feedbackMsg && (
        <div
          style={{
            backgroundColor: '#dcfce7',
            color: '#15803d',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 600,
          }}
        >
          {feedbackMsg}
        </div>
      )}

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>Total Catalog</span>
            <Package size={20} color="#2563eb" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>{products.length}</div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a' }}>Active live products</span>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>Total Orders</span>
            <Truck size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>{orders.length}</div>
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>All customer bookings</span>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>Gross Revenue</span>
            <DollarSign size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>
            ${totalRevenue.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a' }}>+18.4% this month</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            fontWeight: activeTab === 'products' ? 700 : 500,
            color: activeTab === 'products' ? '#2874f0' : '#6b7280',
            borderBottom: activeTab === 'products' ? '3px solid #2874f0' : 'none',
            fontSize: '0.95rem',
          }}
        >
          Manage Products ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('add')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            fontWeight: activeTab === 'add' ? 700 : 500,
            color: activeTab === 'add' ? '#2874f0' : '#6b7280',
            borderBottom: activeTab === 'add' ? '3px solid #2874f0' : 'none',
            fontSize: '0.95rem',
          }}
        >
          + Add New Product
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            fontWeight: activeTab === 'orders' ? 700 : 500,
            color: activeTab === 'orders' ? '#2874f0' : '#6b7280',
            borderBottom: activeTab === 'orders' ? '3px solid #2874f0' : 'none',
            fontSize: '0.95rem',
          }}
        >
          Manage Customer Orders ({orders.length})
        </button>
      </div>

      {/* TAB 1: Add New Product Form */}
      {activeTab === 'add' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            padding: '28px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            maxWidth: '720px',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>
            List a New Product on PrimeKart
          </h2>

          <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Product Title / Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Brand
              </label>
              <input
                type="text"
                placeholder="e.g. Sony, Apple, Nike"
                value={newProduct.brand}
                onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                required
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Selling Price ($)
              </label>
              <input
                type="number"
                placeholder="348"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Original Price / M.R.P ($)
              </label>
              <input
                type="number"
                placeholder="399"
                value={newProduct.originalPrice}
                onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Image URL (Unsplash or direct URL)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                required
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Units in Stock
              </label>
              <input
                type="number"
                placeholder="20"
                value={newProduct.countInStock}
                onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
                required
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Key Features (comma-separated)
              </label>
              <input
                type="text"
                placeholder="Noise Canceling, 30hr Battery, Fast USB-C Charging"
                value={newProduct.features}
                onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
                Product Description
              </label>
              <textarea
                rows={3}
                placeholder="Provide details about design, specifications, and warranty..."
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#2874f0',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                Publish Product to Store
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Products List Table */}
      {activeTab === 'products' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={{ padding: '14px 16px' }}>Item</th>
                <th style={{ padding: '14px 16px' }}>Category</th>
                <th style={{ padding: '14px 16px' }}>Price</th>
                <th style={{ padding: '14px 16px' }}>Stock</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '4px', backgroundColor: '#fafafa' }}
                    />
                    <strong style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </strong>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {p.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 700 }}>${p.price.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ color: p.countInStock < 10 ? '#dc2626' : '#16a34a', fontWeight: 600 }}>
                      {p.countInStock} units
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: Customer Orders Table */}
      {activeTab === 'orders' && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                <th style={{ padding: '14px 16px' }}>Order ID</th>
                <th style={{ padding: '14px 16px' }}>Customer</th>
                <th style={{ padding: '14px 16px' }}>Items</th>
                <th style={{ padding: '14px 16px' }}>Total Amount</th>
                <th style={{ padding: '14px 16px' }}>Status</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Update Progress</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>#{o._id.slice(-6)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div><strong>{o.customerName}</strong></div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{o.customerEmail}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>{o.orderItems?.length || 1} item(s)</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#b12704' }}>
                    ${o.totalPrice?.toLocaleString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor:
                          o.status === 'Delivered'
                            ? '#dcfce7'
                            : o.status === 'Shipped'
                            ? '#dbeafe'
                            : '#fef3c7',
                        color:
                          o.status === 'Delivered'
                            ? '#15803d'
                            : o.status === 'Shipped'
                            ? '#1e40af'
                            : '#b45309',
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <select
                      value={o.status}
                      onChange={(e) => handleUpdateStatus(o._id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
