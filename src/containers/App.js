import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import {
  Badge,
  Button,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
  CardContent,
  Card,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useUser } from '../context/UserContext';
import ProductDashboard from '../components/ProductDashboard';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { getAllProducts } from '../api/productApi';
import ProductDetailPage from '../components/ProductDetailPage';
import ProductPage from '../components/productCrud';
import '../styles/tailwind.css'; // Import Tailwind CSS
import CheckoutPage from '../components/checkout'; // Add this import

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = { ...useUser() };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getAllProducts();
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Container className="mt-8">
      <Grid container spacing={4} className="mb-8">
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`/product/${product.id}`}
              onClick={(event) => {
                const isQuantityControl = event.target.matches('input');
                const isAddToCartButton = event.target.matches('span');

                if (isQuantityControl || isAddToCartButton) {
                  event.preventDefault();
                }
              }}
              className="no-underline"
            >
              <ProductDashboard product={product} onAddToCart={handleAddToCart} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleUpdateQuantity = (newQuantity) => {
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemoveItem = () => {
    onRemoveItem(item.id);
  };

  return (
    <Card key={item.id} className="cart-item-card mb-2">
      <CardContent className="flex justify-between items-center">
        <div>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography color="textSecondary">
            <div>Quantity: {item.qty}</div>
            <div>Price: ${item.price.toFixed(2)}</div>
            <div>Total: ${(item.price * item.qty).toFixed(2)}</div>
          </Typography>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={item.qty}
            onChange={(e) => handleUpdateQuantity(e.target.value)}
            className="border px-2 py-1 w-16 mr-2"
          />
          <Button onClick={handleRemoveItem} color="secondary">
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [cartPopoverAnchorEl, setCartPopoverAnchorEl] = useState(null);

  const handleOpenCartPopover = (event) => {
    setCartPopoverAnchorEl(event.currentTarget);
  };

  const handleCloseCartPopover = () => {
    setCartPopoverAnchorEl(null);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <>
      <Badge key={cartItems.length} badgeContent={cartItems.length} color="secondary">
        <Button color="inherit" onClick={handleOpenCartPopover}>
          <ShoppingCartIcon />
        </Button>
      </Badge>
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
        <List className="p-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
          ))}
          {cartItems.length > 0 && (
            <>
              <ListItem className="flex justify-between">
                <Typography variant="subtitle1">Total:</Typography>
                <Typography variant="subtitle1">{`$${getTotalPrice().toFixed(2)}`}</Typography>
              </ListItem>
              <ListItem>
                <Link to="/cart" className="w-full">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onCheckout}
                  >
                    Checkout
                  </Button>
                </Link>
              </ListItem>
            </>
          )}
          {cartItems.length === 0 && (
            <ListItem>
              <ListItemText primary="No items in the cart" />
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
};


const Checkout = ({ cartItems }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <Typography variant="h5" className="mb-4">
        Checkout
      </Typography>
      <List className="mb-4">
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.qty}`} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">
        Total: ${getTotalPrice().toFixed(2)}
      </Typography>
      {/* Add your checkout logic here */}
    </div>
  );
};

const App = () => {
  const { user, logout, cartItems, updateCartItemQuantity, removeCartItem, userType } = {
    ...useUser(),
  };

  useEffect(() => {
    document.title = `E-commerce`;
  }, [cartItems]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeCartItem(productId);
  };

  const handleCheckout = () => {
    // Add your checkout logic here
    console.log('Checkout clicked!');
  };

  return (
    <Router>
      <div>
        <AppBar position="static" className="bg-indigo-600">
          <Toolbar className="container mx-auto justify-between">
            <Typography variant="h6" className="text-white">
              My E-commerce App
            </Typography>
            <div className="flex items-center">
              <Button color="inherit" component={Link} to="/" className="mr-4">
                Home
              </Button>
              {user ? (
                <>
                  {userType ? (
                    <Button color="inherit" component={Link} to="/admin" className="mr-4">
                      Admin
                    </Button>
                  ) : null}
                  <Button color="inherit" onClick={logout} className="mr-4">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/login" className="mr-4">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register" className="mr-4">
                    Register
                  </Button>
                </>
              )}
              {/* Shopping cart */}
              <Cart
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/admin" element={<ProductPage />} />
          <Route path="/cart" element={<Outlet />}>
            <Route index element={<Checkout cartItems={cartItems} />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
