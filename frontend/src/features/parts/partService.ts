import axios from "axios";
import { PartInterface } from '../../features/inventory/Part'; // Import PartInterface

const API_URL = "http://localhost:5000/api/parts/";

// Create part
const createPart = async (partData: PartInterface, token: string): Promise<PartInterface> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
  };

  try {
    const response = await axios.post<PartInterface>(API_URL, partData, config); // Explicitly type the response
    return response.data;
  } catch (error: any) {
    console.error("Failed to create part:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to create part");
  }
};

// Get all parts
const getParts = async (token: string): Promise<PartInterface[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
  };

  try {
    const response = await axios.get<PartInterface[]>(API_URL, config); // Explicitly type the response
    return response.data;
  } catch (error: any) {
    console.error("Failed to create part:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to create part");
  }
};

const partService = {
  createPart,
  getParts
};

export default partService;
