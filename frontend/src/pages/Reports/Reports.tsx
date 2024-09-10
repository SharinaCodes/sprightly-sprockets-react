import React, { useState, useEffect } from "react";

// Static data to simulate report responses
const partsReportData = {
  title: "Parts Creation/Modification Report",
  date: "2024-09-10T03:11:56.251Z",
  parts: [
    { _id: "66c623892f35ddc2d66477de", name: "Gear", createdAt: "2024-08-21T17:27:37.082Z", updatedAt: "2024-08-22T10:16:00.064Z" },
    { _id: "66c6239d2f35ddc2d66477e0", name: "Bolt", createdAt: "2024-08-21T17:27:57.754Z", updatedAt: "2024-08-22T10:17:46.043Z" },
    { _id: "66c623a62f35ddc2d66477e2", name: "Axle", createdAt: "2024-08-21T17:28:06.429Z", updatedAt: "2024-08-21T17:28:06.429Z" },
    { _id: "66c623af2f35ddc2d66477e4", name: "Nut", createdAt: "2024-08-21T17:28:15.642Z", updatedAt: "2024-08-21T17:28:15.642Z" },
    { _id: "66c623b72f35ddc2d66477e6", name: "Washer", createdAt: "2024-08-21T17:28:23.612Z", updatedAt: "2024-08-21T17:28:23.612Z" }
  ]
};

const productsReportData = {
  title: "Products Creation/Modification Report",
  date: "2024-09-10T03:14:15.465Z",
  products: [
    { _id: "66c624532f35ddc2d66477e9", name: "Gearbox", createdAt: "2024-08-21T17:30:59.903Z", updatedAt: "2024-08-21T17:30:59.903Z" },
    { _id: "66c6245d2f35ddc2d66477eb", name: "Axle Assembly", createdAt: "2024-08-21T17:31:09.100Z", updatedAt: "2024-08-21T17:31:09.100Z" },
    { _id: "66c624642f35ddc2d66477ed", name: "Fastening Kit", createdAt: "2024-08-21T17:31:16.191Z", updatedAt: "2024-08-21T17:31:16.191Z" },
    { _id: "66c6246b2f35ddc2d66477ef", name: "Drive Shaft", createdAt: "2024-08-21T17:31:23.914Z", updatedAt: "2024-08-21T17:31:23.914Z" },
    { _id: "66c624742f35ddc2d66477f1", name: "Mechanical Assembly", createdAt: "2024-08-21T17:31:32.576Z", updatedAt: "2024-08-21T17:31:32.576Z" }
  ]
};

const usersReportData = {
  title: "Users Creation/Modification Report",
  date: "2024-09-10T03:11:56.251Z",
  users: [
    { _id: "66c623892f35ddc2d66477de", firstName: "John", lastName: "Doe", email: "john.doe@example.com", createdAt: "2024-08-21T17:27:37.082Z", updatedAt: "2024-08-22T10:16:00.064Z" },
    { _id: "66c6239d2f35ddc2d66477e0", firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", createdAt: "2024-08-21T17:27:57.754Z", updatedAt: "2024-08-22T10:17:46.043Z" }
  ]
};

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState<string>("parts");
  const [reportData, setReportData] = useState<any>(null);

  // Function to fetch report based on the selected report type
  const fetchReport = (type: string) => {
    if (type === "parts") {
      setReportData(partsReportData);
    } else if (type === "products") {
      setReportData(productsReportData);
    } else if (type === "users") {
      setReportData(usersReportData);
    }
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

      <div className="row">
        <div className="col-md-12">
          {reportData && (
            <div>
              <h3>{reportData.title}</h3>
              <p>Date: {new Date(reportData.date).toLocaleString()}</p>

              {/* Conditionally rendering the table based on report type */}
              {reportType === "parts" && reportData.parts && (
                <table className="table table-bordered table-responsive">
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

              {reportType === "products" && reportData.products && (
                <table className="table table-bordered table-responsive">
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

              {reportType === "users" && reportData.users && (
                <table className="table table-bordered table-responsive">
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

          {!reportData && (
            <div className="text-center">
              <p>No data available for the selected report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
