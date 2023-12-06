const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllProducts = async () => {
  try {
    const response = await fetch(BASE_URL + "/products/");
    const data = await response.json();

    return data.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.price, // Placeholder price
      description: item.description,
      imageUrl: item.url ? item.url : ''
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};
