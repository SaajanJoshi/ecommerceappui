import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Badge, Button, Container, Grid, AppBar, Toolbar, Typography, Popover, List, ListItem, ListItemText, CardContent, Card } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useUser } from '../context/UserContext';
import ProductDashboard from '../components/ProductDashboard';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { getAllProducts } from '../api/productApi';
import ProductDetailPage from '../components/ProductDetailPage';
import ProductPage from '../components/productCrud';

import './App.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = { ...useUser() };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getAllProducts();
        console.log('Product list:', productList);
        setProducts(productList);
      } catch (error) {
        // Handle error
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/product/${product.id}`} onClick={(event) => {
              // Check if the click target is the quantity input or the button
              const isQuantityControl = event.target.matches('.quantity-control input');
              const isAddToCartButton = event.target.matches('.add-to-cart-btn span');

              // If clicked on quantity input or Add to Cart button, prevent link navigation
              if (isQuantityControl || isAddToCartButton) {
                event.preventDefault();
              }
            }} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProductDashboard product={product} onAddToCart={handleAddToCart} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const App = () => {
  const { user, logout, cartItems, userType } = { ...useUser() };
  const [cartPopoverAnchorEl, setCartPopoverAnchorEl] = useState(null);

  useEffect(() => {
    document.title = `E-commerce`;
  }, [cartItems]);

  const handleOpenCartPopover = (event) => {
    setCartPopoverAnchorEl(event.currentTarget);
  };

  const handleCloseCartPopover = () => {
    setCartPopoverAnchorEl(null);
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              My E-commerce App
            </Typography>
            <div>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              {user ? (
                <>
                  {userType ? (
                      <Button color="inherit" component={Link} to="/admin">
                        Admin
                      </Button>
                    ) : null}
                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
              {/* Shopping cart icon with badge */}
              <Badge key={cartItems.length} badgeContent={cartItems.length} color="secondary">
                <Button color="inherit" onClick={handleOpenCartPopover}>
                  <ShoppingCartIcon />
                </Button>
              </Badge>
              {/* Cart Popover */}
              <Popover
                open={Boolean(cartPopoverAnchorEl)}
                anchorEl={cartPopoverAnchorEl}
                onClose={handleCloseCartPopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <List>
                  {cartItems.map((item) => (
                    <Card key={item.id} className="cart-item-card">
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {item.name}
                        </Typography>
                        <Typography color="textSecondary">
                          Quantity: {item.qty}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                  {cartItems.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No items in the cart" />
                    </ListItem>
                  )}
                </List>
              </Popover>
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/admin" element={<ProductPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
