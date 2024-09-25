import axios from "axios";

// Define the base API URL for reports
const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}reports/`
  : "http://localhost:5000/api/reports/";

/**
 * Generates a configuration object for HTTP requests with an Authorization header.
 *
 * @param token - The token to be included in the Authorization header.
 * @returns An object containing the headers with the Authorization token.
 */
const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`, // Send token in Authorization header
  },
});

/**
 * Fetches the Parts Timestamp Report from the API.
 *
 * @param {string} token - The authentication token to be included in the request headers.
 * @returns {Promise<any>} - A promise that resolves to the data of the Parts Timestamp Report.
 * @throws {Error} - Throws an error if the request fails, with a message indicating the failure reason.
 */
const getPartsTimestampReport = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_URL}parts-timestamp`,
      getConfig(token)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Parts Timestamp Report:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch Parts Timestamp Report"
    );
  }
};

/**
 * Fetches the Products Timestamp Report from the API.
 *
 * @param {string} token - The authentication token for the API request.
 * @returns {Promise<any>} - A promise that resolves to the data of the Products Timestamp Report.
 * @throws {Error} - Throws an error if the request fails, with a message indicating the failure reason.
 */
const getProductsTimestampReport = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_URL}products-timestamp`,
      getConfig(token)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Products Timestamp Report:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch Products Timestamp Report"
    );
  }
};

/**
 * Fetches the Users Timestamp Report from the API.
 *
 * @param {string} token - The authentication token for the API request.
 * @returns {Promise<any>} - A promise that resolves to the data of the Users Timestamp Report.
 * @throws {Error} - Throws an error if the request fails, with a message indicating the failure reason.
 */
const getUsersTimestampReport = async (token: string) => {
  try {
    const response = await axios.get(
      `${API_URL}users-timestamps`,
      getConfig(token)
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Users Timestamp Report:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to fetch Users Timestamp Report"
    );
  }
};

const reportService = {
  getPartsTimestampReport,
  getProductsTimestampReport,
  getUsersTimestampReport,
};

export default reportService;
