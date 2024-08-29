import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Part from '../Parts/Part';

const AddPart: React.FC = () => {
  // Initial form state with all fields
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    min: "",
    max: "",
    type: "InHouse", // Default type
    machineId: "",
    companyName: "",
  });

  const navigate = useNavigate();

  // Go back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Navigates back to the last visited page in history
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add the part would go here
    console.log("Part added", formData);
    navigate("/");
  };

  return (
    <div className="add-part">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <button className="btn btn-light" onClick={handleGoBack}>
              Go Back
            </button>

            <h1 className="display-4 text-center">Add Part</h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="* Part Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="InHouse">InHouse</option>
                  <option value="Outsourced">Outsourced</option>
                </select>
              </div>
              {formData.type === "InHouse" && (
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="* Machine ID"
                    name="machineId"
                    required={formData.type === "InHouse"}
                    value={formData.machineId}
                    onChange={handleChange}
                  />
                </div>
              )}
              {formData.type === "Outsourced" && (
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="* Company Name"
                    name="companyName"
                    required={formData.type === "Outsourced"}
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              )}
              <input
                type="submit"
                className="btn btn-info btn-block mt-4"
                value="Add Part"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPart;
