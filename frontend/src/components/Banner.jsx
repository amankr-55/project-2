import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const bannerSlides = [
  {
    title: 'The Great Indian Shopping Festival',
    subtitle: 'Up to 60% OFF on Top Laptops, Mobiles & Smart Gadgets',
    tag: 'LIMITED TIME BLOCKBUSTER DEALS',
    bg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #9333ea 100%)',
    badge: 'Extra 10% Instant Bank Discount',
    cta: 'Shop Top Deals',
    category: 'All',
  },
  {
    title: 'Next-Gen Flagship Mobiles',
    subtitle: 'iPhone 15 Pro, Samsung S24 Ultra & OnePlus 12 with No Cost EMI',
    tag: 'NEW LAUNCHES',
    bg: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #10b981 100%)',
    badge: 'Exchange Bonus up to $200',
    cta: 'Explore Smartphones',
    category: 'Mobiles',
  },
  {
    title: 'Studio Sound & Noise Cancellation',
    subtitle: 'Sony WH-1000XM5, AirPods & Bose Headphones at Unbeatable Prices',
    tag: 'AUDIO BLOWOUT SALE',
    bg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #db2777 100%)',
    badge: 'Free Carrying Case Included',
    cta: 'Hear The Beat',
    category: 'Audio',
  },
];

export default function Banner({ onSelectCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = bannerSlides[currentSlide];

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Hero Carousel */}
      <div
        style={{
          position: 'relative',
          background: slide.bg,
          color: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          padding: '48px 36px',
          minHeight: '260px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          transition: 'all 0.5s ease',
        }}
      >
        <div style={{ maxWidth: '640px', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              marginBottom: '12px',
            }}
          >
            <Zap size={14} color="#facc15" />
            <span>{slide.tag}</span>
          </div>

          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '10px',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '20px',
              maxWidth: '520px',
            }}
          >
            {slide.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onSelectCategory(slide.category)}
              style={{
                backgroundColor: '#facc15',
                color: '#111827',
                padding: '10px 22px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(250, 204, 21, 0.4)',
              }}
            >
              {slide.cta}
            </button>
            <span
              style={{
                fontSize: '0.85rem',
                backgroundColor: 'rgba(0,0,0,0.25)',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              🎉 {slide.badge}
            </span>
          </div>
        </div>

        {/* Carousel Arrows */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))
          }
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.25)',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.25)',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
          }}
        >
          {bannerSlides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: idx === currentSlide ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: idx === currentSlide ? '#ffffff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges Strip (Amazon & Flipkart style) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginTop: '16px',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <Truck size={24} color="#2874f0" />
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Fast & Free Delivery</h4>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>On orders above $50</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <ShieldCheck size={24} color="#16a34a" />
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>100% Genuine Products</h4>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Verified Brand Warranties</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <RotateCcw size={24} color="#f59e0b" />
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>7 Days Easy Returns</h4>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Hassle-free refunds</p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <Zap size={24} color="#9333ea" />
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Secure Payments</h4>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>Cards, UPI, COD supported</p>
          </div>
        </div>
      </div>
    </div>
  );
}
