// partService.ts

import axios from "axios";
import { PartInterface } from '../../features/inventory/Part'; // Import PartInterface

const API_URL = "http://localhost:5000/api/parts/";

// Create part
const createPart = async (partData: PartInterface, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
  };
  const response = await axios.post(API_URL, partData, config); // Add config to request
  return response.data;
};

const partService = {
  createPart,
};

export default partService;
