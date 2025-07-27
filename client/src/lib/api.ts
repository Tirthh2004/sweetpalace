// lib/api.js - Fixed API functions
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Received HTML instead of JSON:', text);
    throw new Error('Server returned HTML instead of JSON. Check if the server is running and the URL is correct.');
  }

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || data.message || `HTTP error! status: ${response.status}`);
  }
  
  return data;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Register user - Updated to match backend expectations
export const registerUser = async (name, email, phone, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password
      })
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        refresh: refreshToken
      })
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Get all sweets
export const getSweets = async () => {
  const token = localStorage.getItem("accessToken"); // ✅ Correct key

  const response = await fetch("http://localhost:8000/api/sweets/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // ✅ send token if available
    },
  });

  if (!response.ok) {
    throw new Error("Authentication failed: " + response.statusText);
  }

  return await response.json();
};

// Search sweets
export const searchSweets = async (query, category, minPrice, maxPrice) => {
  try {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (category) params.append('category', category);
    if (minPrice) params.append('min_price', minPrice);
    if (maxPrice) params.append('max_price', maxPrice);

    const response = await fetch(`${API_BASE_URL}/sweets/search/?${params}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Search sweets error:', error);
    throw error;
  }
};

// Add sweet
export const addSweet = async (sweetData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sweets/add/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(sweetData)
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Add sweet error:', error);
    throw error;
  }
};

// Update sweet
export const updateSweet = async (id, sweetData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sweets/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(sweetData)
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Update sweet error:', error);
    throw error;
  }
};

// Delete sweet
export const deleteSweet = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/sweets/${id}/delete/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  return await handleResponse(response);
};


// Purchase sweet
export const purchaseSweet = async (sweetId, quantity) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sweets/${sweetId}/purchase/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity })
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Purchase sweet error:', error);
    throw error;
  }
};

// Restock sweet
export const restockSweet = async (id, amount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sweets/${id}/restock/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ amount })
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Restock sweet error:', error);
    throw error;
  }
};

// Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};
