// src/context/UserContext.js
import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [statusCiode, setStatusCode] = useState(null);

  const addToCart = (product) => {
    // Logic to update cartItems
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Product already exists in the cart, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].qty = product.qty;
        return updatedItems;
      } else {
        // Product is not in the cart, add it
        const updatedItems = [...prevItems, { ...product }];
        return updatedItems;
      }
    });
    console.log('Updated cartItems:', cartItems);
  };

  const login = (username, token) => {
    setUser(username);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  console.log('UserContext:', { user, cartItems, token });
  return <UserContext.Provider value={{ user, login, logout, cartItems, addToCart, token }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
