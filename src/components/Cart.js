import React, { useState } from 'react';
import CartItem from './CartItem';
import { Typography, List, ListItem, ListItemText, IconButton, Badge, Drawer } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import './Cart.css';

const Cart = ({ cartItems }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleToggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  return (
    <div className="cart">
      <IconButton color="inherit" onClick={handleToggleCart}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={isCartOpen} onClose={handleCloseCart}>
        <div className="cart-drawer">
          <IconButton className="close-icon" onClick={handleCloseCart}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="cart-title">
            Shopping Cart
          </Typography>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <List>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </List>
              <div className="cart-total">
                <ListItem>
                  <ListItemText primary={`Total: $${calculateTotal()}`} />
                </ListItem>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Cart;
