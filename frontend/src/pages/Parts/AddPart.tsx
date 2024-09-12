import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Part from "../../features/inventory/Part";
import { RootState, AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { createPart, reset } from '../../features/parts/partSlice';
import { toast } from "react-toastify";

// Define the interface for form state
interface FormData {
  name: string;
  price: string;
  stock: string;
  min: string;
  max: string;
  type: "InHouse" | "Outsourced";
  machineId: string;
  companyName: string;
}

// Define the User interface to ensure that it has firstName and email
interface User {
  firstName: string;
  email: string;
}

const AddPart: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    stock: "",
    min: "",
    max: "",
    type: "InHouse", // Default type
    machineId: "",
    companyName: "",
  });

  const user = useSelector((state: RootState) => state.auth.user) as User | null;
  const { isSuccess, isError, message } = useSelector((state: RootState) => state.part);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.firstName,
      }));
    }
  }, [user]);

  // Monitor Redux state for success/error
  useEffect(() => {
    if (isSuccess) {
      toast.success("Part added successfully!");
      dispatch(reset());  // Reset the state after success
      navigate("/");  // Only navigate on success
    }
  
    if (isError) {
      toast.error(message || "Failed to add part.");
      dispatch(reset());  // Reset the state after error
    }
  }, [isSuccess, isError, message, navigate, dispatch]);
  

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert Part class instance to a plain object
  const convertPartToPlainObject = (part: Part) => {
    return {
      name: part.getName(),
      price: part.getPrice(),
      stock: part.getStock(),
      min: part.getMin(),
      max: part.getMax(),
      type: part.getType() as "InHouse" | "Outsourced", // Explicitly cast the type
      machineId: part.getMachineId(),
      companyName: part.getCompanyName(),
    };
  };

  // Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create a new Part instance using your class
      const newPart = new Part(
        formData.name,
        parseFloat(formData.price),
        parseInt(formData.stock),
        parseInt(formData.min),
        parseInt(formData.max),
        formData.type,
        formData.type === "InHouse" ? formData.machineId : null,
        formData.type === "Outsourced" ? formData.companyName : null
      );

      // Convert Part instance to plain object for dispatching
      const partObject = convertPartToPlainObject(newPart);

      // Dispatch the part object to Redux
      dispatch(createPart(partObject));
    } catch (error) {
      console.error("Failed to add part:", error);
    }
  };

  return (
    <div className="add-part">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <button className="btn btn-light" onClick={() => navigate(-1)}>
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
