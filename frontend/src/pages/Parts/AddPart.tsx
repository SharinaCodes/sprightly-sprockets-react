import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Part from "../../features/inventory/Part";
import { RootState, AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { createPart, reset } from '../../features/parts/partSlice';
import { toast } from "react-toastify";

/**
 * Interface representing the form data for adding a part.
 * 
 * @property {string} name - The name of the part.
 * @property {string} price - The price of the part.
 * @property {string} stock - The current stock level of the part.
 * @property {string} min - The minimum stock level for the part.
 * @property {string} max - The maximum stock level for the part.
 * @property {"InHouse" | "Outsourced"} type - The type of the part, either "InHouse" or "Outsourced".
 * @property {string} machineId - The machine ID associated with the part (applicable if type is "InHouse").
 * @property {string} companyName - The company name associated with the part (applicable if type is "Outsourced").
 */
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

/**
 * Represents a user with a first name and an email address.
 *
 * @interface User
 * @property {string} firstName - The first name of the user.
 * @property {string} email - The email address of the user.
 */
interface User {
  firstName: string;
  email: string;
}

/**
 * Component for adding a new part to the inventory.
 * 
 * @component
 * @example
 * return (
 *   <AddPart />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component allows users to add a new part by filling out a form with part details such as name, price, stock, and type (InHouse or Outsourced).
 * It handles form submission, input changes, and dispatches actions to the Redux store for creating a part.
 * 
 * @function
 * @name AddPart
 * 
 * @description
 * The `AddPart` component manages the state for the part form, handles form submission, and interacts with the Redux store to dispatch actions for creating a new part.
 * 
 * @typedef {Object} FormData
 * @property {string} name - The name of the part.
 * @property {string} price - The price of the part.
 * @property {string} stock - The stock quantity of the part.
 * @property {string} min - The minimum stock quantity.
 * @property {string} max - The maximum stock quantity.
 * @property {"InHouse" | "Outsourced"} type - The type of the part.
 * @property {string} machineId - The machine ID (for InHouse parts).
 * @property {string} companyName - The company name (for Outsourced parts).
 * 
 * @typedef {Object} RootState
 * @property {Object} auth - The authentication state.
 * @property {User | null} auth.user - The authenticated user.
 * @property {Object} part - The part state.
 * @property {boolean} part.isSuccess - Indicates if the part was successfully added.
 * @property {boolean} part.isError - Indicates if there was an error adding the part.
 * @property {string} part.message - The error message if any.
 * 
 * @typedef {Object} User
 * @property {string} firstName - The first name of the user.
 * 
 * @hook
 * @name useEffect
 * @description
 * Handles initialization, such as fetching parts and resetting the form state after part submission.
 * 
 * @hook
 * @name useState
 * @description
 * Manages the state for form data such as part details (name, price, stock, etc.).
 * 
 * @hook
 * @name useNavigate
 * @description
 * Provides navigation functionality.
 * 
 * @hook
 * @name useDispatch
 * @description
 * Provides dispatch functionality for Redux actions.
 * 
 * @hook
 * @name useSelector
 * @description
 * Selects the part and user state from the Redux store.
 * 
 * @function
 * @name handleChange
 * @description
 * Handles input changes for the part form.
 * 
 * @function
 * @name onSubmit
 * @description
 * Handles form submission for adding a new part to the inventory.
 * 
 * @function
 * @name Spinner
 * @description
 * Displays a loading spinner while parts data is being processed.
 */

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

  const [formSubmitted, setFormSubmitted] = useState(false); // Form submission flag

  const user = useSelector((state: RootState) => state.auth.user) as User | null;
  const { isSuccess, isError, message } = useSelector((state: RootState) => state.part);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Reset part state on mount to avoid stale state
    dispatch(reset());
  }, [dispatch]);

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
    if (isSuccess && formSubmitted) {
      toast.success("Part added successfully!");
      navigate("/");  // Only navigate on success
      dispatch(reset());
    }
  
    if (isError && formSubmitted) {
      toast.error(message || "Failed to add part.");
      dispatch(reset());  // Reset the state after error
    }

    // Cleanup on unmount or when navigating away
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, message, navigate, dispatch, formSubmitted]);

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
    setFormSubmitted(true); // Set form submission flag

    try {
      // Create a new Part instance
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