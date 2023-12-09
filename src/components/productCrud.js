// Import necessary React and utility functions
import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getAllCategories } from '../api/productApi';
import { useUser } from '../context/UserContext';
import '../styles/tailwind.css'; // Import Tailwind CSS

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    category: '',
    imgUrl: '',
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

      const categoryList = await getAllCategories(token);
      setCategories(categoryList);
    } catch (error) {
      setError('Error fetching products or categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      await createProduct(formData, token);
      setFormData({ id: '', name: '', price: '', category: '', imgUrl: '' });
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
      setFormData({ id: '', name: '', price: '', category: '', imgUrl: '' });
      fetchProducts();
      setIsEditMode(false);
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
    setFormData({ id: product.id, name: product.name, price: product.price, category: product.category.id, imgUrl: product.imgUrl });
    setIsEditMode(true);
  };

  const handleCreateNewProduct = () => {
    setFormData({ id: '', name: '', price: '', category: '', imgUrl: '' });
    setIsEditMode(false);
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col md:flex-row">
        {/* Product List Table */}
        <div className="w-full md:w-3/4 md:pr-4 mb-4 md:mb-0">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Category</th>
                <th className="py-2">Image</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">${product.price}</td>
                  <td className="py-2">{product.category.name}</td>
                  <td className="py-2">
                    {product.imgUrl && (
                      <img src={product.imgUrl} alt={product.name} className="max-w-16 max-h-16 object-cover" />
                    )}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleEditButtonClick(product)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Form */}
        <div className="w-full md:w-1/4">
          <div className="bg-gray-100 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-600 mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 mb-4"
            />

            <label className="block text-sm font-medium text-gray-600 mb-2">Price:</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 mb-4"
            />

            <label className="block text-sm font-medium text-gray-600 mb-2">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 mb-4"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-600 mb-2">Image URL:</label>
            <input
              type="text"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 mb-4"
            />

            {isEditMode ? (
              <div>
                <button
                  onClick={handleEditProduct}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Update Product
                </button>
                <button
                  onClick={handleCreateNewProduct}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create New Product
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddProduct}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
