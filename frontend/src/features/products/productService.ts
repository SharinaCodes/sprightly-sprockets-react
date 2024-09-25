import axios from "axios";
import { ProductInterface } from "../inventory/Product";

// Full backend API URL
const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}products/`
  : "http://localhost:5000/api/products/";


/**
 * Generates a configuration object for HTTP requests with an Authorization header.
 *
 * @param token - The JWT token to be included in the Authorization header.
 * @returns An object containing the headers with the Authorization token.
 */
const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`, // Send token in Authorization header
  },
});

/**
 * Creates a new product by sending a POST request to the API.
 *
 * @param {ProductInterface} productData - The data of the product to be created.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<ProductInterface>} - A promise that resolves to the created product data.
 * @throws {Error} - Throws an error if the product creation fails.
 */
const createProduct = async (
  productData: ProductInterface,
  token: string
): Promise<ProductInterface> => {
  try {
    const response = await axios.post<ProductInterface>(
      API_URL,
      productData,
      getConfig(token)
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to create product:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to create product"
    );
  }
};

/**
 * Fetches the list of products from the API.
 *
 * @param {string} token - The authentication token for the API request.
 * @returns {Promise<ProductInterface[]>} - A promise that resolves to an array of products.
 * @throws {Error} - Throws an error if the request fails, with a message indicating the failure reason.
 */
const getProducts = async (token: string): Promise<ProductInterface[]> => {
  try {
    const response = await axios.get<ProductInterface[]>(
      API_URL,
      getConfig(token)
    );
    return response.data;
  } catch (error: any) {
    console.error("Unable to get products:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Unable to get products"
    );
  }
};

/**
 * Updates an existing product with the provided data.
 *
 * @param {ProductInterface} productData - The data of the product to update. Must include the product's `_id`.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<ProductInterface>} - A promise that resolves to the updated product data.
 * @throws {Error} - Throws an error if the product ID is missing or if the update request fails.
 */
const updateProduct = async (
  productData: ProductInterface,
  token: string
): Promise<ProductInterface> => {
  const productId = productData._id; // Ensure productId is retrieved from the productData._id field

  if (!productId) {
    throw new Error("Product ID is required for update");
  }

  // Send only the necessary fields to the server (excluding _id)
  const updatePayload = {
    name: productData.name,
    price: productData.price,
    stock: productData.stock,
    min: productData.min,
    max: productData.max,
    associatedParts: productData.associatedParts,
  };

  try {
    const response = await axios.put<ProductInterface>(
      `${API_URL}${productId}`,
      updatePayload,
      getConfig(token)
    ); // Properly set the URL and payload
    return response.data;
  } catch (error: any) {
    console.error("Failed to update product:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to update product"
    );
  }
};

/**
 * Fetches a product by its ID from the API.
 *
 * @param productId - The unique identifier of the product to be retrieved.
 * @param token - The authentication token for the API request.
 * @returns A promise that resolves to the product data.
 * @throws Will throw an error if the request fails, with a message indicating the failure reason.
 */
const lookupProductById = async (
  productId: string,
  token: string
): Promise<ProductInterface> => {
  try {
    const response = await axios.get<ProductInterface>(
      `${API_URL}id/${productId}`,
      getConfig(token)
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to retrieve product"
    );
  }
};

/**
 * Asynchronously looks up products by their name.
 *
 * @param {string} name - The name of the product to search for.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise<ProductInterface[]>} A promise that resolves to an array of products matching the given name.
 * @throws Will throw an error if the request fails, with a message indicating the failure reason.
 */
const lookupProductByName = async (
  name: string,
  token: string
): Promise<ProductInterface[]> => {
  try {
    const response = await axios.get<ProductInterface[]>(
      `${API_URL}name/${name}`,
      getConfig(token)
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to search product by name:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to search product"
    );
  }
};

/**
 * Deletes a product by its ID.
 *
 * @param productId - The ID of the product to delete.
 * @param token - The authentication token for the request.
 * @returns A promise that resolves when the product is deleted.
 * @throws Will throw an error if the deletion fails.
 */
const deleteProduct = async (
  productId: string,
  token: string
): Promise<void> => {
  try {
    await axios.delete(`${API_URL}${productId}`, getConfig(token)); // Use the productId in the URL to delete the product
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to delete product"
    );
  }
};

const productService = {
  createProduct,
  getProducts,
  updateProduct,
  lookupProductById,
  lookupProductByName, // New method added
  deleteProduct,
};

export default productService;
