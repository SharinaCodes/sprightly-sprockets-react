import axios from 'axios';

const API_URL = '/api/auth/';

// Register user
const register = async (userData: { firstName: string; lastName: string; email: string; password: string }) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

// Login user
const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
