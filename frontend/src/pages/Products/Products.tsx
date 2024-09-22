import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import ProductComponent from "./Product";
import { RootState, AppDispatch } from "../../app/store";
import {
  getProducts,
  deleteProduct,
  reset,
} from "../../features/products/productSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const Products: React.FC = () => {
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

    // Cleanup on unmount or when navigating away
    return () => {
      dispatch(reset()); // Ensure state is cleared on unmount
    };
  }, [dispatch, isError, message]);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Display spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = (id: string | undefined) => {
    if (id) {
      dispatch(deleteProduct(id)); // Dispatch the delete action with the product ID
    } else {
      console.error("Invalid product ID");
    }
  };

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
            <form className="form-inline w-100">
              <div className="row w-100">
                <div className="col-8 col-md-10">
                  <input
                    className="form-control w-100"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
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
                {products.map((product) => (
                  <ProductComponent
                    key={product._id}
                    product={product}
                    handleDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
