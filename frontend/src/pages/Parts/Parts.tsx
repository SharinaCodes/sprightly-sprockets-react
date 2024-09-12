import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import PartComponent from "./Part";
import { RootState, AppDispatch } from "../../app/store";
import { getParts, reset } from "../../features/parts/partSlice";
import Spinner from "../../components/Spinner";

const Parts: React.FC = () => {
  // Fetch parts state from Redux
  const { parts, isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.part
  );

  const dispatch = useDispatch<AppDispatch>();

  //clear state on unmount
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  // Fetch parts on component mount
  useEffect(() => {
    dispatch(getParts());
  }, [dispatch]);

  // Display spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  // Handle errors
  if (isError) {
    return <p>Error: {message}</p>;
  }

  // Delete handler
  const handleDelete = (id: string | undefined) => {
    console.log("Delete part with id:", id);
    // Implement delete functionality
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <button type="button" className="btn btn-link mb-4">
            <FaPlusSquare className="text-info mr-1" />
            <Link to="/add-part" className="text-info">
              Add Part
            </Link>
          </button>
          <h2 className="mb-4">Parts</h2>
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

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Min</th>
                  <th>Max</th>
                  <th>Source</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parts.map((part) =>
                  part._id ? ( // Ensure id exists
                    <PartComponent
                      key={part._id}
                      part={part}
                      handleDelete={handleDelete}
                    />
                  ) : null // Skip rendering if no id
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parts;
