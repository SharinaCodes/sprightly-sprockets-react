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
          {/* Wrapping table with table-responsive class */}
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
        </div>
      </div>
    </div>
  );
};

export default Products;
