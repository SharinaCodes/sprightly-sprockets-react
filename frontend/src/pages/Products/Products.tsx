import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import ProductComponent from "./Product";
import { RootState, AppDispatch } from "../../app/store";
import { getProducts, reset } from "../../features/products/productSlice";
import Spinner from "../../components/Spinner";
import {toast} from 'react-toastify';

const Products: React.FC = () => {
  //Fetch all products from Redux
  const {products, isLoading, isSuccess, isError, message} = useSelector(
    (state: RootState) => state.product
  );

  const dispatch = useDispatch<AppDispatch>();

  //clear state on unmount
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    }
  }, [dispatch, isError, isSuccess, message]);

  // Fetch products on mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  // display spinner while loading
  if (isLoading) {
    return <Spinner />
  }
  const handleDelete = (id: string | undefined) => {
    console.log("Delete product with id:", id);
    // Implement delete functionality
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
                <div className="col-8 col-sm-10">
                  <input
                    className="form-control w-100"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
                <div className="col-4 col-sm-2">
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
                )
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
