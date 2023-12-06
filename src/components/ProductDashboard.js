import React, { useState } from 'react';
import { Button, Paper, Typography, Input } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './ProductDashboard.css';

const ProductDashboard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartItems] = useState([]);

  console.log('Cart items from product :', cartItems);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', product, quantity);
    onAddToCart({...product,qty:quantity});
  };

  return (
    <Paper className="product-card">
      <img className="product-image" src={product.imageUrl} alt={product.name} loading="lazy" />
      <div className="product-details">
        <Typography variant="h6" className="product-title">
          {product.name}
        </Typography>
        <Typography variant="body1" className="product-price">
          ${product.price.toFixed(2)}
        </Typography>
        <div className="quantity-control">
          <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
          <Input
            type="number"
            id={`quantity-${product.id}`}
            name={`quantity-${product.id}`}
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <Button onClick={handleAddToCart} className="add-to-cart-btn" variant="contained" color="primary" startIcon={<AddShoppingCartIcon />}>
          Add to Cart
        </Button>
      </div>
    </Paper>
  );
};

export default ProductDashboard;


