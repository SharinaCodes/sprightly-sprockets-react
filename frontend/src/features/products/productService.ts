import axios from 'axios';
import { ProductInterface } from '../inventory/Product';

const API_URL = "http://localhost:5000/api/products/";

// Create product
const createProduct = async (productData: ProductInterface, token: string): Promise<ProductInterface> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
  };

  try {
    const response = await axios.post<ProductInterface>(API_URL, productData, config); // Explicitly type the response
    return response.data;
  } catch (error: any) {
    console.error("Failed to create product:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to create product");
  }
};

const productService = {
  createProduct,
};

export default productService;
