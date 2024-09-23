import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchPartsTimestampReport, fetchProductsTimestampReport, fetchUsersTimestampReport, reset } from "../../features/reports/reportSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<string>("parts");

  const dispatch = useDispatch<AppDispatch>();

  const { partsReport, productsReport, usersReport, isLoading, isError, message } = useSelector((state: RootState) => state.report);

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
        <div className="col-md-12 text-center">
          <button
            className={`btn btn-primary mr-2 ${reportType === "parts" ? "active" : ""}`}
            onClick={() => setReportType("parts")}
          >
            Parts Report
          </button>
          <button
            className={`btn btn-primary mr-2 ${reportType === "products" ? "active" : ""}`}
            onClick={() => setReportType("products")}
          >
            Products Report
          </button>
          <button
            className={`btn btn-primary ${reportType === "users" ? "active" : ""}`}
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
