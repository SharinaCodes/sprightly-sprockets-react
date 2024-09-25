import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}users/`
  : "http://localhost:5000/api/users/";

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


/**
 * Registers a new user with the provided user data.
 *
 * @param {RegisterUserData} userData - The data of the user to register.
 * @returns {Promise<any>} The response data from the registration request.
 *
 * @throws {Error} If the registration request fails.
 */
const register = async (userData: RegisterUserData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    // Save user data to local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

/**
 * Logs in a user with the provided user data.
 *
 * @param {LoginUserData} userData - The data of the user to log in.
 * @returns {Promise<any>} The response data from the login request.
 *
 * @throws {Error} If the login request fails.
 */
const login = async (userData: LoginUserData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    // Save user data to local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

/**
 * Logs out the current user by removing the user data from local storage.
 */
const logout = () => localStorage.removeItem("user");

// Export the auth service
const authService = {
  register,
  login,
  logout,
};

export default authService;
