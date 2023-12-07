import React, { useState } from 'react';
import { Button, Paper, Typography, Input, Link, Grid } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './ProductDashboard.css';

const ProductDashboard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartItems] = useState([]);

  console.log('Cart items from product :', cartItems);
  const handleQuantityChange = (e) => {
    // Prevent the default behavior of the button inside the Input component
    e.preventDefault();
    // Stop the event propagation to prevent the link from being clicked
    e.stopPropagation();
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', product, quantity);
    onAddToCart({ ...product, qty: quantity });
  };

  return (

    <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <Button
            onClick={handleAddToCart}
            className="add-to-cart-btn"
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
          >
            Add to Cart
          </Button>
        </div>
      </Paper>
    </Grid>
);
};

export default ProductDashboard;


