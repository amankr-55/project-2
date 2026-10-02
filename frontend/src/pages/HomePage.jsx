import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';

export default function HomePage({
  searchTerm,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Sorting state
  const [sortBy, setSortBy] = useState('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState(2000);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/api/products?category=${encodeURIComponent(selectedCategory)}`;
        if (searchTerm) {
          url += `&keyword=${encodeURIComponent(searchTerm)}`;
        }
        if (sortBy) {
          url += `&sort=${sortBy}`;
        }
        if (maxPriceFilter < 2000) {
          url += `&maxPrice=${maxPriceFilter}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to load products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory, sortBy, maxPriceFilter]);

  // Categories list
  const categoryFilters = [
    { label: 'All Deals', value: 'All' },
    { label: '📱 Mobiles', value: 'Mobiles' },
    { label: '💻 Laptops', value: 'Laptops' },
    { label: '🎧 Audio', value: 'Audio' },
    { label: '⌚ Smart Watches', value: 'Watches' },
    { label: '👕 Fashion', value: 'Fashion' },
    { label: '🏠 Home & Living', value: 'Home' },
  ];

  return (
    <div className="container" style={{ padding: '20px 16px' }}>
      {/* Banner / Promotional Carousel */}
      {!searchTerm && (
        <Banner onSelectCategory={(cat) => setSelectedCategory(cat)} />
      )}

      {/* Filter and Sorting Header Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '14px 20px',
          borderRadius: '10px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {categoryFilters.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: selectedCategory === cat.value ? '#2874f0' : '#f3f4f6',
                color: selectedCategory === cat.value ? '#ffffff' : '#374151',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Controls (Max Price + Sort) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          {/* Price Range Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <span style={{ color: '#6b7280', fontWeight: 600 }}>Max Price:</span>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              style={{ width: '100px', cursor: 'pointer' }}
            />
            <strong style={{ color: '#111827' }}>${maxPriceFilter}</strong>
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <span style={{ color: '#6b7280', fontWeight: 600 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                fontWeight: 600,
                color: '#374151',
                outline: 'none',
              }}
            >
              <option value="featured">Featured Deals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#111827' }}>
          {searchTerm ? (
            <span>Results for "{searchTerm}"</span>
          ) : selectedCategory === 'All' ? (
            <span>Today's Top Recommendations</span>
          ) : (
            <span>Top Deals in {selectedCategory}</span>
          )}
        </h2>
        <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
          Showing {products.length} products
        </span>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #e5e7eb',
              borderTop: '3px solid #2874f0',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p style={{ fontWeight: 600 }}>Loading amazing products for you...</p>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '20px 0',
          }}
        >
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '48px 20px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#374151' }}>
            No products found matching your search.
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>
            Try resetting your filters or searching for different keywords like iPhone, Sony, Shoes, or Coffee.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setMaxPriceFilter(2000);
              setSortBy('featured');
            }}
            style={{
              backgroundColor: '#2874f0',
              color: '#ffffff',
              padding: '8px 20px',
              borderRadius: '20px',
              fontWeight: 600,
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '18px',
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}
