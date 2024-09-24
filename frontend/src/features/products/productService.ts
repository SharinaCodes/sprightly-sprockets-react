import axios from "axios";
import { ProductInterface } from "../inventory/Product";

// Full backend API URL
const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}products/`
  : "http://localhost:5000/api/products/";
console.log(API_URL);

// Helper function to generate config with Authorization header
const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`, // Send token in Authorization header
  },
});

// Create product
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

// Get all products
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

// Update product
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

// Find product by ID
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

// Lookup product by name (partial, case-insensitive match)
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

// Delete product by ID
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
