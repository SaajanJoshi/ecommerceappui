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


export const getProductById = async (prodId) => {
  console.log('prodId:', prodId);
  try {
    const response = await fetch(BASE_URL + "/products/" + prodId);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};