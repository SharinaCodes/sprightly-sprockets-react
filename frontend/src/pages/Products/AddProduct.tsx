import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObjectId } from 'bson';
import Part from '../../features/inventory/Part';
import Product from "../../features/inventory/Product";

// Example of existing parts data (you'll likely replace this with data from your API or state)
const existingPartsData = [
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
];

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    min: "",
    max: "",
  });

  const [associatedParts, setAssociatedParts] = useState<Part[]>([]); // Parts associated with the product
  const [selectedPartId, setSelectedPartId] = useState<string>(""); // ID of the selected part to associate

  const navigate = useNavigate();

  // Go back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Navigates back to the last visited page in history
  };

  // Handle input change for product data
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle selection of a part to associate with the product
  const handleAddPart = () => {
    const selectedPart = existingPartsData.find((part) => part._id === selectedPartId);
    if (selectedPart) {
      const part = new Part(
        new ObjectId(selectedPart._id),
        selectedPart.name,
        selectedPart.price,
        selectedPart.stock,
        selectedPart.min,
        selectedPart.max,
        selectedPart.type,
        selectedPart.type === "InHouse" ? selectedPart.machineId : null,
        selectedPart.type === "Outsourced" ? selectedPart.companyName : null
      );

      // Add selected part to associated parts
      setAssociatedParts([...associatedParts, part]);

      // Reset the selected part dropdown
      setSelectedPartId("");
    }
  };

  // Handle form submission for the product
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newProduct = new Product(
        new ObjectId(),
        formData.name,
        parseFloat(formData.price),
        parseInt(formData.stock),
        parseInt(formData.min),
        parseInt(formData.max),
        associatedParts
      );

      // Logic to add the product would go here (e.g., dispatching to Redux, making an API call)
      console.log("Product added", newProduct);

      navigate("/");
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="add-product">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <button className="btn btn-light" onClick={handleGoBack}>
              Go Back
            </button>

            <h1 className="display-4 text-center">Add Product</h1>
            <form onSubmit={onSubmit}>
              {/* Product form fields */}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="* Product Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="* Stock"
                  name="stock"
                  required
                  value={formData.stock}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="* Price"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="* Minimum Value"
                  name="min"
                  required
                  value={formData.min}
                  onChange={handleProductChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="* Maximum Value"
                  name="max"
                  required
                  value={formData.max}
                  onChange={handleProductChange}
                />
              </div>

              <h2 className="mt-4">Add Associated Parts</h2>
              {/* Dropdown for selecting an existing part */}
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  value={selectedPartId}
                  onChange={(e) => setSelectedPartId(e.target.value)}
                >
                  <option value="">Select a Part</option>
                  {existingPartsData.map((part) => (
                    <option key={part._id} value={part._id}>
                      {part.name} (Stock: {part.stock}, Price: {part.price})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-secondary btn-block mt-3"
                onClick={handleAddPart}
                disabled={!selectedPartId}
              >
                Add Associated Part
              </button>

              <h3 className="mt-4">Associated Parts</h3>
              {associatedParts.length > 0 ? (
                <ul className="list-group">
                  {associatedParts.map((part, index) => (
                    <li key={index} className="list-group-item">
                      {part.getName()} (Stock: {part.getStock()}, Price: {part.getPrice()})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No associated parts added yet.</p>
              )}

              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                value="Add Product"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
