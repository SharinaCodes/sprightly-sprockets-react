import axios from "axios";

const API_URL =  process.env.REACT_APP_API_URL? `${process.env.REACT_APP_API_URL}/users/` : 'http://localhost:5000/api/users/';
console.log(API_URL);

// Define the interface for user registration data
interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Define the interface for user login data
interface LoginUserData {
  email: string;
  password: string;
}

// Register user
const register = async (userData: RegisterUserData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    // Save user data to local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData: LoginUserData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    // Save user data to local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Logout user
const logout = () => localStorage.removeItem("user");

// Export the auth service
const authService = {
  register,
  login,
  logout,
};

export default authService;
