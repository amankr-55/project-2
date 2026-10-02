import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  User,
  Package,
  ShieldCheck,
  LogOut,
  MapPin,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenLogin,
  currentView,
  setCurrentView,
}) {
  const { user, logout } = useAuth();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const categories = [
    'All',
    'Mobiles',
    'Laptops',
    'Audio',
    'Watches',
    'Fashion',
    'Home',
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      {/* Top Main Navbar */}
      <div
        style={{
          backgroundColor: '#131921',
          color: '#ffffff',
          padding: '10px 16px',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Brand Logo */}
          <div
            onClick={() => {
              setCurrentView('home');
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.1,
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                Prime<span style={{ color: '#ff9900' }}>Kart</span>
              </span>
              <span
                style={{
                  backgroundColor: '#ff9900',
                  color: '#131921',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: '3px',
                  marginLeft: '4px',
                }}
              >
                PLUS
              </span>
            </div>
            <span style={{ fontSize: '0.7rem', color: '#ccc', letterSpacing: '0.3px' }}>
              Explore <span style={{ color: '#ff9900', fontWeight: 600 }}>Real Shopping</span>
            </span>
          </div>

          {/* Delivery Location Mockup */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              color: '#ccc',
              cursor: 'pointer',
              padding: '6px 8px',
              borderRadius: '4px',
              border: '1px solid transparent',
            }}
            title="Change Delivery Location"
          >
            <MapPin size={18} color="#ff9900" />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.7rem', color: '#999' }}>Deliver to</span>
              <strong style={{ color: '#fff' }}>India, 110001</strong>
            </div>
          </div>

          {/* Search Bar with Category Select */}
          <div
            style={{
              flex: 1,
              maxWidth: '680px',
              display: 'flex',
              backgroundColor: '#fff',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }}
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                backgroundColor: '#f3f4f6',
                border: 'none',
                padding: '0 12px',
                fontSize: '0.85rem',
                color: '#374151',
                cursor: 'pointer',
                borderRight: '1px solid #e5e7eb',
                outline: 'none',
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Departments' : cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search Amazon & Flipkart style products, brands, electronics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                padding: '10px 14px',
                outline: 'none',
                fontSize: '0.9rem',
                color: '#111827',
              }}
            />

            <button
              style={{
                backgroundColor: '#febd69',
                color: '#131921',
                padding: '0 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3a847')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#febd69')}
              aria-label="Search"
            >
              <Search size={19} strokeWidth={2.5} />
            </button>
          </div>

          {/* Account / User Menu */}
          <div style={{ position: 'relative' }}>
            {user ? (
              <div
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  lineHeight: 1.2,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ fontSize: '0.72rem', color: '#ccc' }}>Hello, {user.name.split(' ')[0]}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#fff' }}>Account & Lists</strong>
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#2874f0',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '7px 22px',
                  borderRadius: '4px',
                  border: '1px solid #dbdbdb',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                Login
              </button>
            )}

            {/* Dropdown Menu */}
            {userMenuOpen && user && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  backgroundColor: '#ffffff',
                  color: '#111827',
                  borderRadius: '6px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  minWidth: '210px',
                  overflow: 'hidden',
                  zIndex: 200,
                  border: '1px solid #e5e7eb',
                }}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f3f4f6',
                    backgroundColor: '#fafafa',
                  }}
                >
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{user.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>{user.email}</p>
                  {user.isAdmin && (
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        padding: '1px 6px',
                        borderRadius: '3px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                      }}
                    >
                      Admin Access
                    </span>
                  )}
                </div>

                <div
                  onClick={() => {
                    setCurrentView('orders');
                    setUserMenuOpen(false);
                  }}
                  style={{
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Package size={16} color="#4b5563" />
                  <span>My Orders</span>
                </div>

                {user.isAdmin && (
                  <div
                    onClick={() => {
                      setCurrentView('admin');
                      setUserMenuOpen(false);
                    }}
                    style={{
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      color: '#2563eb',
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#eff6ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <ShieldCheck size={16} />
                    <span>Seller Dashboard</span>
                  </div>
                )}

                <div
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  style={{
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: '#ef4444',
                    borderTop: '1px solid #f3f4f6',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>

          {/* Orders Quick Nav */}
          <div
            onClick={() => {
              if (!user) onOpenLogin();
              else setCurrentView('orders');
            }}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.2,
              padding: '6px 8px',
            }}
          >
            <span style={{ fontSize: '0.72rem', color: '#ccc' }}>Returns</span>
            <strong style={{ fontSize: '0.85rem', color: '#fff' }}>& Orders</strong>
          </div>

          {/* Cart Icon & Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '4px',
              position: 'relative',
            }}
          >
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={24} color="#ff9900" />
              {totalItemsCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-10px',
                    backgroundColor: '#e11d48',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #131921',
                  }}
                >
                  {totalItemsCount}
                </span>
              )}
            </div>
            <strong style={{ fontSize: '0.9rem', color: '#fff' }}>Cart</strong>
          </button>
        </div>
      </div>

      {/* Sub-Navbar / Categories Strip */}
      <div
        style={{
          backgroundColor: '#232f3e',
          color: '#ffffff',
          padding: '6px 16px',
          fontSize: '0.86rem',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            onClick={() => {
              setSelectedCategory('All');
              setCurrentView('home');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontWeight: selectedCategory === 'All' ? 700 : 500,
              color: selectedCategory === 'All' ? '#ff9900' : '#ffffff',
            }}
          >
            <span>☰ All Deals</span>
          </div>

          {categories.filter((c) => c !== 'All').map((cat) => (
            <div
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentView('home');
              }}
              style={{
                cursor: 'pointer',
                padding: '4px 6px',
                borderRadius: '4px',
                fontWeight: selectedCategory === cat ? 700 : 400,
                color: selectedCategory === cat ? '#ff9900' : '#e5e7eb',
                borderBottom: selectedCategory === cat ? '2px solid #ff9900' : '2px solid transparent',
              }}
            >
              {cat}
            </div>
          ))}

          <div
            onClick={() => {
              setSelectedCategory('All');
              setCurrentView('home');
            }}
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#facc15',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.82rem',
            }}
          >
            <Sparkles size={14} />
            <span>Big Festival Sale Live Now!</span>
          </div>
        </div>
      </div>
    </header>
  );
}
