import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import ProductComponent from "./Product";
import { RootState, AppDispatch } from "../../app/store";
import {
  getProducts,
  lookupProductByName,
  deleteProduct,
  reset,
} from "../../features/products/productSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

/**
 * Component for displaying and managing a list of products.
 * 
 * @component
 * @example
 * return (
 *   <Products />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component displays a list of products with options to search, add, and delete products. It also handles state management for product data and search functionality.
 * 
 * @function
 * @name Products
 * 
 * @description
 * The `Products` component fetches and displays products from the Redux store. Users can search for products by name, add new products, and delete existing products. It also handles the display of a spinner during loading and provides a message when no products are available.
 * 
 * @typedef {Object} ProductInterface
 * @property {string} _id - The unique identifier of the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {number} stock - The stock quantity of the product.
 * @property {number} min - The minimum stock quantity.
 * @property {number} max - The maximum stock quantity.
 * 
 * @hook
 * @name useSelector
 * @description
 * Selects products, loading status, and error messages from the Redux store.
 * 
 * @hook
 * @name useDispatch
 * @description
 * Provides dispatch functionality for Redux actions.
 * 
 * @hook
 * @name useEffect
 * @description
 * - Fetches products on component mount or when the search term is cleared.
 * - Handles errors and resets the state when the component is unmounted.
 * 
 * @hook
 * @name useState
 * @description
 * Manages the state for the search term.
 * 
 * @function
 * @name handleSearchChange
 * @description
 * Handles changes to the search input and updates the search term state.
 * 
 * @function
 * @name handleSearchSubmit
 * @description
 * Handles form submission for product search. If the search term is blank, it fetches all products; otherwise, it looks up products by name.
 * 
 * @function
 * @name handleDelete
 * @description
 * Handles the deletion of a product by dispatching the delete action with the product ID.
 * 
 * @typedef {Object} RootState
 * @property {Object} product - The product state from Redux.
 * @property {ProductInterface[]} product.products - The list of products.
 * @property {boolean} product.isLoading - Indicates if the product data is still loading.
 * @property {boolean} product.isError - Indicates if there was an error fetching the product data.
 * @property {string} product.message - Error message related to product fetching or actions.
 * 
 * @typedef {Function} AppDispatch
 * 
 * @function
 * @name FaPlusSquare
 * @description
 * FontAwesome plus icon that is used to add a new product.
 * 
 * @function
 * @name ProductComponent
 * @description
 * A sub-component used for rendering each product in a table row. It includes details and actions (edit and delete) for each product.
 * 
 * @function
 * @name Spinner
 * @description
 * Displays a loading spinner while the products are being fetched.
 * 
 * @returns {JSX.Element} The rendered component that shows products, a search bar, and an option to add new products.
 */
const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch products state from Redux
  const { products, isLoading, isError, message } = useSelector(
    (state: RootState) => state.product
  );

  const dispatch = useDispatch<AppDispatch>();

  // Handle errors and clear state on unmount
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset()); // Reset after showing the toast for error
    }

    // Cleanup on unmount
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  // Fetch products on component mount or when search is cleared
  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch(getProducts());
    }
  }, [dispatch, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If search term is blank, fetch all products, otherwise perform search
    if (searchTerm.trim() === "") {
      dispatch(getProducts());
    } else {
      dispatch(lookupProductByName(searchTerm));
    }
  };

  const handleDelete = (id: string | undefined) => {
    if (id) {
      dispatch(deleteProduct(id)); // Dispatch the delete action with the product ID
    } else {
      console.error("Invalid product ID");
    }
  };

  // Display spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <button type="button" className="btn btn-link mb-4">
            <FaPlusSquare className="text-info mr-1" />
            <Link to="/add-product" className="text-info">
              Add Product
            </Link>
          </button>
          <h2 className="mb-4">Products</h2>

          {/* Conditionally render the search bar */}
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline w-100" onSubmit={handleSearchSubmit}>
              <div className="row w-100">
                <div className="col-8 col-md-10">
                  <input
                    className="form-control w-100"
                    type="search"
                    placeholder="Search by Product Name"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="col-4 col-md-2">
                  <button
                    className="btn btn-outline-primary w-100"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </nav>

          {/* Display a message if there are no products */}
          {products.length === 0 ? (
            <p className="lead">Add Products to get started</p> // Display this paragraph when there are no products
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => (
                      <ProductComponent
                        key={product._id}
                        product={product}
                        handleDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
