import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getAllCategories } from '../api/productApi';
import './ProductPage.css'; // Import your custom styles
import { useUser } from '../context/UserContext';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    category: '', // Category field in form data
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const { token } = useUser();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productList = await getAllProducts();
      setProducts(productList);

      // Fetch categories
      const categoryList = await getAllCategories(token);
      setCategories(categoryList);
    } catch (error) {
      setError('Error fetching products or categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(async() => {
    await fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      await createProduct(formData, token);
      setFormData({ id: '', name: '', price: '', category: '' });
      fetchProducts();
    } catch (error) {
      setError('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async () => {
    try {
      setLoading(true);
      await updateProduct(formData.id, formData, token);
      setFormData({ id: '', name: '', price: '', category: '' });
      fetchProducts();
      setIsEditMode(false); // Switch back to create mode after editing
    } catch (error) {
      setError('Error updating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      await deleteProduct(productId, token);
      fetchProducts();
    } catch (error) {
      setError('Error deleting product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditButtonClick = (product) => {
    // Set form data for editing
    setFormData({ id: product.id, name: product.name, price: product.price, category: product.category.id });
    setIsEditMode(true);
  };

  const handleCreateNewProduct = () => {
    setFormData({ id: '', name: '', price: '', category: '' });
    setIsEditMode(false);
  };

  return (
    <div className="product-page">
      <h1>Product Management</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Product List Table */}
      <table className="product-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category.name}</td>
              <td>
                <button onClick={() => handleEditButtonClick(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Product Form */}
      <div className="product-form">
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        <label>Price: </label>
        <input type="text" name="price" value={formData.price} onChange={handleInputChange} />

        {/* Category Dropdown */}
        <label>Category: </label>
        <select name="category" value={formData.category} onChange={handleInputChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Add, Edit, or Create New button */}
        {isEditMode ? (
          <div>
            <button onClick={handleEditProduct}>Update Product</button>
            <button onClick={handleCreateNewProduct}>Create New Product</button>
          </div>
        ) : (
          <button onClick={handleAddProduct}>Add Product</button>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
