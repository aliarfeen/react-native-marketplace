const BASE_URL = 'https://fakestoreapi.com';

export const fakeStoreApi = {
  // Login
  login: async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
  // new method to get user by id 
    getUserById: async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    return await response.json();
  },

  // Get all products
  getProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },


  //updateUser
updateUser: async (id, data) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("API response not ok: " + response.status);
      }

      return await response.json();
    } catch (error) {
      console.error("API updateUser error:", error);
      throw error;
    }
}


}

export default fakeStoreApi;