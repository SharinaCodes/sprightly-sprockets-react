import React from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { ObjectId } from "bson"; // Import ObjectId from mongodb
import PartComponent from "./Part";
import Part from "../../features/inventory/Part";

const partData = [
  {
    _id: "66c623892f35ddc2d66477de",
    name: "Gear",
    price: 12.99,
    stock: 11,
    min: 10,
    max: 200,
    type: "InHouse",
    machineId: "MCH-001",
    companyName: null,
  },
  {
    _id: "66c6239d2f35ddc2d66477e0",
    name: "Bolt",
    price: 0.99,
    stock: 55,
    min: 55,
    max: 1000,
    type: "Outsourced",
    machineId: null,
    companyName: "Fasteners Inc.",
  },
  {
    _id: "66c623a62f35ddc2d66477e2",
    name: "Axle",
    price: 25.5,
    stock: 75,
    min: 20,
    max: 150,
    type: "InHouse",
    machineId: "MCH-002",
    companyName: null,
  },
  {
    _id: "66c623af2f35ddc2d66477e4",
    name: "Nut",
    price: 0.5,
    stock: 300,
    min: 30,
    max: 600,
    type: "Outsourced",
    machineId: null,
    companyName: "Nutty Supplies Ltd.",
  },
  {
    _id: "66c623b72f35ddc2d66477e6",
    name: "Washer",
    price: 0.1,
    stock: 1000,
    min: 100,
    max: 2000,
    type: "InHouse",
    machineId: "MCH-003",
    companyName: null,
  },
];

const Parts: React.FC = () => {
  const parts = partData.map(
    (part) =>
      new Part(
        new ObjectId(part._id), // Convert the string _id to an ObjectId
        part.name,
        part.price,
        part.stock,
        part.min,
        part.max,
        part.type,
        part.machineId,
        part.companyName
      )
  );

  const handleDelete = (id: ObjectId) => {
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
                {parts.map((part) => (
                  <PartComponent
                    key={part.getId().toString()}
                    part={part}
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

export default Parts;
