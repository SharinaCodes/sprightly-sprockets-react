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
    const response = await axios.post<ProductInterface>(API_URL, productData, config);
    return response.data;
  } catch (error: any) {
    console.error("Failed to create product:", error);
    throw new Error(error.response?.data?.message || error.message || "Failed to create product");
  }
};

// Get all parts
const getProducts = async (token: string): Promise<ProductInterface[]> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

   const response = await axios.get<ProductInterface[]>(API_URL, config); 
   return response.data;
 } catch (error: any) {
   console.error("Unable to get products:", error);
   throw new Error(error.response?.data?.message || error.message || "Unable to get products");
 }
};


const productService = {
  createProduct,
  getProducts
};

export default productService;
