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
const getParts = async (): Promise<PartInterface[]> => {
   try {
    const response = await axios.get<PartInterface[]>(API_URL); // Explicitly type the response
    return response.data;
  } catch (error: any) {
    console.error("Unable to get parts:", error);
    throw new Error(error.response?.data?.message || error.message || "Unable to get parts");
  }
};

// Update part
const updatePart = async (partData: PartInterface, token: string): Promise<PartInterface> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const partId = partData._id; // Ensure partId is retrieved from the partData._id field

  if (!partId) {
    throw new Error("Part ID is required for update");
  }

  // Send only the necessary fields to the server (excluding _id)
  const updatePayload = {
    name: partData.name,
    price: partData.price,
    stock: partData.stock,
    min: partData.min,
    max: partData.max,
    type: partData.type,
    machineId: partData.type === "InHouse" ? partData.machineId : null,
    companyName: partData.type === "Outsourced" ? partData.companyName : null,
  };

  try {
    const response = await axios.put<PartInterface>(`${API_URL}${partId}`, updatePayload, config); // Properly set the URL and payload
    return response.data;
  } catch (error: any) {
    console.error("Failed to update part:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to update part");
  }
};


const partService = {
  createPart,
  getParts,
  updatePart
};

export default partService;
