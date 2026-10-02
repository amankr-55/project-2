import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const { login, register, loading, error, setError } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      const res = await register(name, email, password);
      if (res.success) onClose();
    } else {
      const res = await login(email, password);
      if (res.success) onClose();
    }
  };

  // Quick 1-click test credentials helper
  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    login(demoEmail, demoPass).then((res) => {
      if (res.success) onClose();
    });
  };

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
        zIndex: 700,
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
          borderRadius: '12px',
          width: '100%',
          maxWidth: '440px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative',
        }}
      >
        {/* Header Strip */}
        <div
          style={{
            backgroundColor: '#131921',
            color: '#ffffff',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              Prime<span style={{ color: '#ff9900' }}>Kart</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af' }}>
              {isRegister ? 'Create your PrimeKart Account' : 'Sign in to access your orders & cart'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
          <button
            onClick={() => {
              setIsRegister(false);
              setError(null);
            }}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: !isRegister ? '#ffffff' : '#f9fafb',
              fontWeight: !isRegister ? 700 : 500,
              color: !isRegister ? '#2874f0' : '#6b7280',
              borderBottom: !isRegister ? '2px solid #2874f0' : 'none',
              fontSize: '0.9rem',
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsRegister(true);
              setError(null);
            }}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: isRegister ? '#ffffff' : '#f9fafb',
              fontWeight: isRegister ? 700 : 500,
              color: isRegister ? '#2874f0' : '#6b7280',
              borderBottom: isRegister ? '2px solid #2874f0' : 'none',
              fontSize: '0.9rem',
            }}
          >
            New Customer? Sign Up
          </button>
        </div>

        {/* Quick Demo Login Presets */}
        <div
          style={{
            padding: '14px 24px 0 24px',
            backgroundColor: '#fffbeb',
            borderBottom: '1px solid #fef3c7',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e', marginBottom: '8px' }}>
            ⚡ QUICK 1-CLICK DEMO LOGIN:
          </div>
          <div style={{ display: 'flex', gap: '8px', paddingBottom: '12px' }}>
            <button
              onClick={() => handleQuickLogin('user@eshop.com', 'user123')}
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                border: '1px solid #d97706',
                color: '#92400e',
                fontSize: '0.78rem',
                padding: '6px 8px',
                borderRadius: '6px',
                fontWeight: 600,
              }}
            >
              👤 Customer Account
            </button>
            <button
              onClick={() => handleQuickLogin('admin@eshop.com', 'admin123')}
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                border: '1px solid #b45309',
                color: '#78350f',
                fontSize: '0.78rem',
                padding: '6px 8px',
                borderRadius: '6px',
                fontWeight: 600,
              }}
            >
              🛡️ Admin Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                marginBottom: '16px',
                border: '1px solid #fca5a5',
              }}
            >
              {error}
            </div>
          )}

          {isRegister && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                Your Name
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  backgroundColor: '#ffffff',
                }}
              >
                <User size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
                <input
                  type="text"
                  placeholder="First and last name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
              Email Address
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px 12px',
                backgroundColor: '#ffffff',
              }}
            >
              <Mail size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
              Password
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px 12px',
                backgroundColor: '#ffffff',
              }}
            >
              <Lock size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#ffd814',
              color: '#0f1111',
              padding: '12px',
              borderRadius: '24px',
              fontWeight: 700,
              fontSize: '0.95rem',
              border: '1px solid #fcd200',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>

          <p
            style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              textAlign: 'center',
              marginTop: '16px',
              lineHeight: 1.4,
            }}
          >
            By continuing, you agree to PrimeKart's Conditions of Use and Privacy Notice.
          </p>
        </form>
      </div>
    </div>
  );
}
