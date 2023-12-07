// ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Input } from '@material-ui/core';
import { getProductById } from '../api/productApi'; // Import your API function
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {useUser} from '../context/UserContext'


const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const {addToCart} = useUser();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDetails = await getProductById(productId);
        console.log('Product details:', productDetails);
        setProduct(productDetails);
      } catch (error) {
        // Handle error
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    addToCart({...product,qty:quantity})
  };


  return (
    <Container style={{ marginTop: '20px' }}>
      {product ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="300"
                image={product.image} // Assuming you have an 'image' property in your product data
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography>
                  <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                  <Input
                    type="number"
                    id={`quantity-${product.id}`}
                    name={`quantity-${product.id}`}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  </Typography>  
                <Button onClick={handleAddToCart} variant="contained" color="primary" style={{ marginTop: '10px' }} startIcon={<AddShoppingCartIcon />}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Container>
  );
};

export default ProductDetailPage;
