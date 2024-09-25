import axios from "axios";
import { PartInterface } from "../../features/inventory/Part"; // Import PartInterface

const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}parts/`
  : "http://localhost:5000/api/parts/";


/**
 * Creates a new part by sending a POST request to the API.
 *
 * @param partData - The data of the part to be created.
 * @param token - The authorization token for the request.
 * @returns A promise that resolves to the created part.
 * @throws Will throw an error if the part creation fails.
 */
const createPart = async (
  partData: PartInterface,
  token: string
): Promise<PartInterface> => {
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
    throw new Error(
      error.response?.data?.message || error.message || "Failed to create part"
    );
  }
};


/**
 * Fetches the list of parts from the API.
 *
 * @returns {Promise<PartInterface[]>} A promise that resolves to an array of parts.
 * @throws Will throw an error if the request fails, with a message indicating the failure reason.
 */
const getParts = async (): Promise<PartInterface[]> => {
  try {
    const response = await axios.get<PartInterface[]>(API_URL); // Explicitly type the response
    return response.data;
  } catch (error: any) {
    console.error("Unable to get parts:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Unable to get parts"
    );
  }
};


/**
 * Updates an existing part with the provided data.
 *
 * @param {PartInterface} partData - The data of the part to be updated.
 * @param {string} token - The authorization token for the request.
 * @returns {Promise<PartInterface>} - A promise that resolves to the updated part data.
 * @throws {Error} - Throws an error if the part ID is missing or if the update fails.
 */
const updatePart = async (
  partData: PartInterface,
  token: string
): Promise<PartInterface> => {
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
    const response = await axios.put<PartInterface>(
      `${API_URL}${partId}`,
      updatePayload,
      config
    ); // Properly set the URL and payload
    return response.data;
  } catch (error: any) {
    console.error("Failed to update part:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to update part"
    );
  }
};


/**
 * Fetches a part by its ID from the API.
 *
 * @param partId - The ID of the part to retrieve.
 * @param token - The authorization token to be included in the request headers.
 * @returns A promise that resolves to the part data.
 * @throws Will throw an error if the request fails, with a message indicating the failure reason.
 */
const lookupPartById = async (
  partId: string,
  token: string
): Promise<PartInterface> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
  };

  try {
    const response = await axios.get<PartInterface>(
      `${API_URL}id/${partId}`,
      config
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to retrieve part"
    );
  }
};


/**
 * Fetches parts by their name from the API.
 *
 * @param name - The name of the part to search for.
 * @param token - The authorization token for the API request.
 * @returns A promise that resolves to an array of parts matching the given name.
 * @throws Will throw an error if the request fails.
 */
const lookupPartByName = async (
  name: string,
  token: string
): Promise<PartInterface[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
  };

  try {
    const response = await axios.get<PartInterface[]>(
      `${API_URL}name/${name}`,
      config
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to search part by name:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to search part"
    );
  }
};


/**
 * Deletes a part from the inventory.
 *
 * @param partId - The ID of the part to be deleted.
 * @param token - The authorization token for the request.
 * @returns A promise that resolves when the part is successfully deleted.
 * @throws Will throw an error if the deletion fails.
 */
const deletePart = async (partId: string, token: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(`${API_URL}${partId}`, config); // Use the partId in the URL to delete the part
  } catch (error: any) {
    console.error("Failed to delete part:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to delete part"
    );
  }
};

const partService = {
  createPart,
  getParts,
  updatePart,
  lookupPartById,
  lookupPartByName,
  deletePart,
};

export default partService;
