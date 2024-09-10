import React from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { ObjectId } from "bson";
import ProductComponent from "./Product";
import Product from "../../features/inventory/Product";

const productData = [
  {
    id: "66c624532f35ddc2d66477e9",
    name: "Gearbox",
    price: 49.99,
    stock: 50,
    min: 10,
    max: 100,
  },
  {
    id: "66c6245d2f35ddc2d66477eb",
    name: "Axle Assembly",
    price: 75,
    stock: 30,
    min: 5,
    max: 60,
  },
  {
    id: "66c624642f35ddc2d66477ed",
    name: "Fastening Kit",
    price: 9.99,
    stock: 200,
    min: 20,
    max: 500,
  },
  {
    id: "66c6246b2f35ddc2d66477ef",
    name: "Drive Shaft",
    price: 120,
    stock: 20,
    min: 5,
    max: 40,
  },
  {
    id: "66c624742f35ddc2d66477f1",
    name: "Mechanical Assembly",
    price: 200,
    stock: 15,
    min: 3,
    max: 30,
  },
];

const Products: React.FC = () => {
  const products = productData.map(
    (product) =>
      new Product(
        new ObjectId(product.id), // Convert the string id to an ObjectId
        product.name,
        product.price,
        product.stock,
        product.min,
        product.max
      )
  );

  const handleDelete = (id: ObjectId) => {
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
                    key={product.getId().toString()}
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
