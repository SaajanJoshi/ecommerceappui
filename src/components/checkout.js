import React, { useState } from 'react';
import { List, ListItem, ListItemText, Typography, TextField, Button } from '@material-ui/core';
import '../styles/tailwind.css'; // Import Tailwind CSS

const CheckoutPage = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    payment: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your checkout logic here, for example, send the form data to a server
    console.log('Form submitted:', formData);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <Typography variant="h5" className="mb-4 text-2xl font-bold">
        Checkout
      </Typography>
      {cartItems.length > 0 ? (
        <List className="mb-4">
          {cartItems.map((item) => (
            <ListItem key={item.id} className="border-b py-2">
              <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.qty} | Price: $${item.price.toFixed(2)} | Total: $${(item.price * item.qty).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No items in the cart.</Typography>
      )}
      {cartItems.length > 0 && (
        <ListItem className="flex justify-end">
          <Typography variant="h6" className="font-bold">
            {`Total: $${getTotalPrice().toFixed(2)}`}
          </Typography>
        </ListItem>
      )}
      {cartItems.length > 0 && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Payment Details"
            name="payment"
            value={formData.payment}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Place Order
          </Button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
