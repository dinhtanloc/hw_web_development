// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter(item => item.product !== id);
    });
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) => {
        if (item.product === itemId) {
          return { ...item, quantity: newQuantity, total_price: item.unit_price*newQuantity };
        }
        return item;
      });
      return updatedCartItems;
    });
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );

};

export default CartProvider;
