import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('eshop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('eshop_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Show a temporary snackbar notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add item to cart
  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item._id === product._id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].qty += qty;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            _id: product._id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            countInStock: product.countInStock || 10,
            qty: qty,
          },
        ];
      }
    });

    showToast(`Added "${product.name.slice(0, 24)}..." to Cart!`);
  };

  // Update item quantity
  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, qty: Math.min(newQty, item.countInStock) } : item
      )
    );
  };

  // Remove single item
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    showToast('Item removed from Cart');
  };

  // Clear all items
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate totals
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalOriginalPrice = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.qty,
    0
  );

  const totalSavings = Math.max(0, totalOriginalPrice - subtotal);
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const finalTotal = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        totalSavings,
        shippingFee,
        finalTotal,
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
