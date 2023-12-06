import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const CartItem = ({ item }) => {
  return (
    <Card className="cart-item">
      <CardMedia className="cart-item-image" image={item.imageUrl} title={item.name} />
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2">Quantity: {item.quantity}</Typography>
        <Typography variant="body2">Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
      </CardContent>
    </Card>
  );
};

export default CartItem;
