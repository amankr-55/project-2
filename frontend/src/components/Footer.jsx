import React from 'react';
import { Heart, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ marginTop: '60px', backgroundColor: '#131921', color: '#ffffff' }}>
      {/* Back to top button */}
      <div
        onClick={scrollToTop}
        style={{
          backgroundColor: '#232f3e',
          textAlign: 'center',
          padding: '14px',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#37475a')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#232f3e')}
      >
        ▲ Back to top
      </div>

      {/* Main Footer Links */}
      <div
        className="container"
        style={{
          padding: '48px 16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
        }}
      >
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: '#fff' }}>
            Get to Know Us
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#ccc' }}>
            <li>About PrimeKart</li>
            <li>Careers & Growth</li>
            <li>Press Releases</li>
            <li>PrimeKart Science</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: '#fff' }}>
            Connect with Us
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#ccc' }}>
            <li>Facebook</li>
            <li>Twitter (X)</li>
            <li>Instagram</li>
            <li>YouTube Tech Talks</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: '#fff' }}>
            Make Money with Us
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#ccc' }}>
            <li>Sell on PrimeKart</li>
            <li>Become an Affiliate</li>
            <li>Fulfilment by PrimeKart</li>
            <li>Advertise Your Products</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', color: '#fff' }}>
            Let Us Help You
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#ccc' }}>
            <li>Your Account & Orders</li>
            <li>Returns Centre & Replacements</li>
            <li>100% Purchase Protection</li>
            <li>PrimeKart App Download</li>
            <li>24x7 Customer Support</li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal / Tech Strip */}
      <div
        style={{
          borderTop: '1px solid #37475a',
          padding: '24px 16px',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#9ca3af',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
          <span>PrimeKart &copy; {new Date().getFullYear()} — Built with</span>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>MERN Stack</span>
          <span>(MongoDB, Express, React, Node.js)</span>
        </div>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
          Real Amazon & Flipkart Style Dynamic E-Commerce Web Application. Clean, modular, and human-friendly code.
        </p>
      </div>
    </footer>
  );
}
