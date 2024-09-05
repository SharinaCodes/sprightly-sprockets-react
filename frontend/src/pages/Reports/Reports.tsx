import React, { useState, useEffect } from "react";
import axios from "axios";

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<string>("parts");
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch report based on the selected report type
  const fetchReport = async (type: string) => {
    setLoading(true);
    try {
      let response;
      if (type === "parts") {
        response = await axios.get("/api/reports/parts-timestamps");
      } else if (type === "products") {
        response = await axios.get("/api/reports/products-timestamps");
      } else if (type === "users") {
        response = await axios.get("/api/reports/users-timestamps");
      }
      setReportData(response?.data);
    } catch (error) {
      console.error("Error fetching report:", error);
      setReportData(null);
    }
    setLoading(false);
  };

  // Effect to load the default report (parts) when the component mounts
  useEffect(() => {
    fetchReport(reportType);
  }, [reportType]);

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

      {/* Loading spinner */}
      {loading ? (
        <div className="text-center">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12">
            {reportData && (
              <div>
                <h3>{reportData.title}</h3>
                <p>Date: {new Date(reportData.date).toLocaleString()}</p>

                {/* Conditionally rendering the table based on report type */}
                {reportType === "parts" && (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.parts.map((part: any) => (
                        <tr key={part._id}>
                          <td>{part.name}</td>
                          <td>{new Date(part.createdAt).toLocaleString()}</td>
                          <td>{new Date(part.updatedAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {reportType === "products" && (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.products.map((product: any) => (
                        <tr key={product._id}>
                          <td>{product.name}</td>
                          <td>{new Date(product.createdAt).toLocaleString()}</td>
                          <td>{new Date(product.updatedAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {reportType === "users" && (
                  <table className="table table-bordered">
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
                      {reportData.users.map((user: any) => (
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
                )}
              </div>
            )}

            {!reportData && !loading && (
              <div className="text-center">
                <p>No data available for the selected report.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
