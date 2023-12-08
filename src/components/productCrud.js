import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api/productApi';
import './ProductPage.css'; // Import your custom styles

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productList = await getAllProducts();
        setProducts(productList);
      } catch (error) {
        setError('Error fetching products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      // Add product API call
      // ...

      // Reset form data
      setFormData({ id: '', name: '', price: '' });
    } catch (error) {
      setError('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async () => {
    try {
      setLoading(true);
      // Edit product API call
      // ...

      // Reset form data
      setFormData({ id: '', name: '', price: '' });
    } catch (error) {
      setError('Error updating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      // Delete product API call
      // ...
    } catch (error) {
      setError('Error deleting product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditButtonClick = (product) => {
    // Set form data for editing
    setFormData({ id: product.id, name: product.name, price: product.price });
  };

  return (
    <div className="product-page">
      <h1>Product Management</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Product List */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEditButtonClick(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Product Form */}
      <div className="product-form">
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        <label>Price: </label>
        <input type="text" name="price" value={formData.price} onChange={handleInputChange} />

        {/* Add or Edit button */}
        {formData.id ? (
          <button onClick={handleEditProduct}>Update Product</button>
        ) : (
          <button onClick={handleAddProduct}>Add Product</button>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
