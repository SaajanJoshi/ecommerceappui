import React, { useState } from 'react';
import { Button, Paper, Typography, Input } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import '../styles/tailwind.css'; // Import Tailwind CSS

const ProductDashboard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, qty: quantity });
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <Paper className="w-64 p-4">
        <img className="w-full h-40 object-cover mb-4" src={product.imgUrl} alt={product.name} loading="lazy" />
        <div className="text-center">
          <Typography variant="h6" className="text-lg font-bold mb-2">
            {product.name}
          </Typography>
          <Typography variant="body1" className="text-gray-700 mb-2">
            ${product.price.toFixed(2)}
          </Typography>
          <div className="flex items-center justify-center mb-4">
            <label htmlFor={`quantity-${product.id}`} className="mr-2">
              Quantity:
            </label>
            <Input
              type="number"
              id={`quantity-${product.id}`}
              name={`quantity-${product.id}`}
              value={quantity}
              onChange={handleQuantityChange}
              className="border px-2 py-1 w-16 quantity-control"
            />
          </div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button-control"
            startIcon={<AddShoppingCartIcon />}
          >
            Add to Cart
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default ProductDashboard;
