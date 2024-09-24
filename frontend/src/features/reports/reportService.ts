import axios from "axios";

// Define the base API URL for reports
const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}reports/`
  : "http://localhost:5000/api/reports/";
console.log(API_URL);

// Helper function to generate config with Authorization header
const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`, // Send token in Authorization header
  },
});

// Fetch Parts Creation/Modification Report
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

// Fetch Products Creation/Modification Report
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

// Fetch Users Creation/Modification Report
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
