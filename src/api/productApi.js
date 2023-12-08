const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllProducts = async () => {
  try {
    const response = await fetch(BASE_URL + "/products/");
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};


export const getAllCategories = async (token) => {
  try {
    const response = await fetch(BASE_URL + "/categories/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // Assuming your API expects the token in the Authorization header
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

export const getProductById = async (prodId) => {
  try {
    const response = await fetch(BASE_URL + "/products/" + prodId);
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Error fetching product by ID');
  }
};

export const createProduct = async (productData,token) => {
  try {
    const response = await fetch(BASE_URL + "/products/admin/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Error creating product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
};

export const updateProduct = async (prodId, productData, token) => {
  try {
    const response = await fetch(BASE_URL + "/products/admin/" + prodId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Error updating product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};

export const deleteProduct = async (prodId,token) => {
  try {
    const response = await fetch(`${BASE_URL}/products/admin/${prodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // Assuming your API expects the token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};
