import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  fetchPartsTimestampReport,
  fetchProductsTimestampReport,
  fetchUsersTimestampReport,
  reset,
} from "../../features/reports/reportSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

/**
 * Component for displaying different types of reports (Parts, Products, Users).
 * 
 * @component
 * @example
 * return (
 *   <Reports />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * The `Reports` component allows users to view different reports such as Parts, Products, and Users based on their creation and update timestamps. The reports are fetched from the Redux store and displayed in a table format. Users can switch between different report types using buttons.
 * 
 * @function
 * @name Reports
 * 
 * @description
 * This component fetches the selected report type (Parts, Products, Users) from the backend and displays the relevant data in a table. It also handles the display of a loading spinner while fetching data and error messages if the request fails.
 * 
 * @typedef {Object} Part
 * @property {string} _id - The unique identifier of the part.
 * @property {string} name - The name of the part.
 * @property {string} createdAt - The timestamp when the part was created.
 * @property {string} updatedAt - The timestamp when the part was last updated.
 * 
 * @typedef {Object} Product
 * @property {string} _id - The unique identifier of the product.
 * @property {string} name - The name of the product.
 * @property {string} createdAt - The timestamp when the product was created.
 * @property {string} updatedAt - The timestamp when the product was last updated.
 * 
 * @typedef {Object} User
 * @property {string} _id - The unique identifier of the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} email - The email of the user.
 * @property {string} createdAt - The timestamp when the user was created.
 * @property {string} updatedAt - The timestamp when the user was last updated.
 * 
 * @hook
 * @name useSelector
 * @description
 * Selects the reports, loading status, and error messages from the Redux store.
 * 
 * @hook
 * @name useDispatch
 * @description
 * Provides dispatch functionality for Redux actions.
 * 
 * @hook
 * @name useEffect
 * @description
 * - Handles fetching reports based on the selected report type.
 * - Displays error messages and resets the Redux state when errors occur.
 * 
 * @hook
 * @name useState
 * @description
 * Manages the state for the selected report type.
 * 
 * @function
 * @name renderTable
 * @description
 * Dynamically renders the appropriate report table based on the selected report type.
 * 
 * @function
 * @name fetchPartsTimestampReport
 * @description
 * Dispatches the action to fetch the parts report from the Redux store.
 * 
 * @function
 * @name fetchProductsTimestampReport
 * @description
 * Dispatches the action to fetch the products report from the Redux store.
 * 
 * @function
 * @name fetchUsersTimestampReport
 * @description
 * Dispatches the action to fetch the users report from the Redux store.
 * 
 * @function
 * @name Spinner
 * @description
 * Displays a loading spinner while the reports are being fetched.
 * 
 * @returns {JSX.Element} The rendered table or a message indicating no data is available.
 */

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<string>("parts");

  const dispatch = useDispatch<AppDispatch>();

  const {
    partsReport,
    productsReport,
    usersReport,
    isLoading,
    isError,
    message,
  } = useSelector((state: RootState) => state.report);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  // Fetch the appropriate report based on report type
  useEffect(() => {
    if (reportType === "parts") {
      dispatch(fetchPartsTimestampReport());
    } else if (reportType === "products") {
      dispatch(fetchProductsTimestampReport());
    } else if (reportType === "users") {
      dispatch(fetchUsersTimestampReport());
    }
  }, [dispatch, reportType]);

  if (isLoading) {
    return <Spinner />;
  }

  const renderTable = () => {
    if (reportType === "parts" && partsReport?.parts) {
      return (
        <table className="table table-bordered w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {partsReport.parts.map((part: any) => (
              <tr key={part._id}>
                <td>{part.name}</td>
                <td>{new Date(part.createdAt).toLocaleString()}</td>
                <td>{new Date(part.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (reportType === "products" && productsReport?.products) {
      return (
        <table className="table table-bordered w-100">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {productsReport.products.map((product: any) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
                <td>{new Date(product.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (reportType === "users" && usersReport?.users) {
      return (
        <table className="table table-bordered w-100">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {usersReport.users.map((user: any) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <p>No data available for the selected report.</p>;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Reports</h1>

      <div className="row mb-3">
        <div className="col-sm-12 text-center">
          <button
            className={`btn btn-primary mr-2 ${
              reportType === "parts" ? "active" : ""
            }`}
            onClick={() => setReportType("parts")}
          >
            Parts Report
          </button>
          <button
            className={`btn btn-primary mr-2 ${
              reportType === "products" ? "active" : ""
            }`}
            onClick={() => setReportType("products")}
          >
            Products Report
          </button>
          <button
            className={`btn btn-primary ${
              reportType === "users" ? "active" : ""
            }`}
            onClick={() => setReportType("users")}
          >
            Users Report
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">{renderTable()}</div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
