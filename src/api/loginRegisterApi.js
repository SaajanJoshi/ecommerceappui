const BASE_URL = process.env.REACT_APP_BASE_URL

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(BASE_URL + "/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Handle non-successful response (e.g., authentication failure)
      console.error('Login failed:', response.statusText);
      throw new Error('Login failed');
    }

    const data = await response.json();

    // Assuming your server returns user data upon successful login
    return {
      user: data.user,
      token: data.token,
      status_code: response.status,
    };
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Error during login');
  }
};
