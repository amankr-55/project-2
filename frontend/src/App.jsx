import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import LoginModal from './components/LoginModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import { CheckCircle2 } from 'lucide-react';

function MainApp() {
  // Navigation View State: 'home' | 'checkout' | 'orders' | 'admin'
  const [currentView, setCurrentView] = useState('home');

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal States
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { toastMessage } = useCart();
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="animate-fade"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#111827',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={18} color="#22c55e" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenLogin={() => setIsLoginOpen(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'home' && (
          <HomePage
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onBackToHome={() => setCurrentView('home')}
            onViewOrders={() => setCurrentView('orders')}
          />
        )}

        {currentView === 'orders' && (
          <OrdersPage onBackToHome={() => setCurrentView('home')} />
        )}

        {currentView === 'admin' && (
          <AdminPage onBackToHome={() => setCurrentView('home')} />
        )}
      </main>

      {/* Sliding Shopping Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setCurrentView('checkout')}
      />

      {/* Product Quick-View Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuyNow={() => setCurrentView('checkout')}
        />
      )}

      {/* Authentication Login / Register Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
