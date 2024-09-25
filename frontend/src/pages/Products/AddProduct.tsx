import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { getParts } from "../../features/parts/partSlice";
import { createProduct, reset } from "../../features/products/productSlice";
import { ProductInterface, AssociatedPartForAPI } from "../../features/inventory/Product";
import { PartInterface } from "../../features/inventory/Part";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

// Define the interface for form data
interface FormData {
  name: string;
  price: string;
  stock: string;
  min: string;
  max: string;
}

/**
 * Component for adding a new product.
 * 
 * @component
 * @example
 * return (
 *   <AddProduct />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component allows users to add a new product by filling out a form with product details and associating parts with the product.
 * 
 * @function
 * @name AddProduct
 * 
 * @description
 * The `AddProduct` component manages the state for the product form, handles form submission, and interacts with the Redux store to dispatch actions for creating a product and fetching parts.
 * 
 * @typedef {Object} FormData
 * @property {string} name - The name of the product.
 * @property {string} price - The price of the product.
 * @property {string} stock - The stock quantity of the product.
 * @property {string} min - The minimum stock quantity.
 * @property {string} max - The maximum stock quantity.
 * 
 * @typedef {Object} PartInterface
 * @property {string} _id - The unique identifier of the part.
 * @property {string} name - The name of the part.
 * @property {number} stock - The stock quantity of the part.
 * @property {number} price - The price of the part.
 * 
 * @typedef {Object} AssociatedPartForAPI
 * @property {string} partId - The unique identifier of the part.
 * @property {string} name - The name of the part.
 * 
 * @typedef {Object} ProductInterface
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {number} stock - The stock quantity of the product.
 * @property {number} min - The minimum stock quantity.
 * @property {number} max - The maximum stock quantity.
 * @property {AssociatedPartForAPI[]} associatedParts - The list of associated parts.
 * 
 * @hook
 * @name useEffect
 * @description
 * - Resets the product state and fetches parts on component mount.
 * - Handles success and error states after product creation.
 * 
 * @hook
 * @name useState
 * @description
 * Manages the state for form data, associated parts, selected part ID, and form submission flag.
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
 * Selects parts and product state from the Redux store.
 * 
 * @function
 * @name handleProductChange
 * @description
 * Handles input changes for the product form.
 * 
 * @function
 * @name handleAddPart
 * @description
 * Handles the addition of a part to the associated parts list.
 * 
 * @function
 * @name handleRemovePart
 * @description
 * Handles the removal of a part from the associated parts list.
 * 
 * @function
 * @name onSubmit
 * @description
 * Handles form submission for adding a new product.
 * 
 * @function
 * @name Spinner
 * @description
 * Displays a loading spinner while parts are being fetched.
 */
const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    stock: "",
    min: "",
    max: "",
  });/**
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

  const [associatedParts, setAssociatedParts] = useState<PartInterface[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false); // New flag to track form submission

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { parts, isLoading, isError, message } = useSelector(
    (state: RootState) => state.part
  );
  const { isSuccess: productSuccess, isError: productError, message: productMessage } = useSelector(
    (state: RootState) => state.product
  );

  // Reset product state on mount
  useEffect(() => {
    dispatch(reset()); // Reset any previous state before mounting the form
    dispatch(getParts());
  }, [dispatch]);

  // Handle success/error state after product creation
  useEffect(() => {
    if (productSuccess && formSubmitted) {
      toast.success("Product added successfully!");
      navigate("/products");
      dispatch(reset()); // Reset state after success
    }

    if (productError && formSubmitted) {
      toast.error(productMessage || "Failed to add product.");
      dispatch(reset()); // Reset state after error
    }
  }, [productSuccess, productError, productMessage, navigate, dispatch, formSubmitted]);

  // Handle input change for product data
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle selection of a part to associate with the product
  const handleAddPart = () => {
    const selectedPart = parts.find((part) => part._id === selectedPartId);
    if (selectedPart && !associatedParts.some((part) => part._id === selectedPartId)) {
      setAssociatedParts([...associatedParts, selectedPart]);
      setSelectedPartId("");
    } else {
      toast.warn("Part is already associated with this product.");
    }
  };

  // Handle removing an associated part
  const handleRemovePart = (partId: string) => {
    setAssociatedParts(associatedParts.filter((part) => part._id !== partId));
  };

  // Handle form submission for the product
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true); // Set form submission flag to true

    try {
      const associatedPartsForApi: AssociatedPartForAPI[] = associatedParts.map((part) => ({
        partId: part._id as string,
        name: part.name,
      }));

      const newProduct: ProductInterface = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        min: parseInt(formData.min),
        max: parseInt(formData.max),
        associatedParts: associatedPartsForApi,
      };

      dispatch(createProduct(newProduct));
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  // Display spinner while loading parts
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="add-product">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <button className="btn btn-light" onClick={() => navigate(-1)}>
              Go Back
            </button>

            <h1 className="display-4 text-center">Add Product</h1>
            <form onSubmit={onSubmit}>
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
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  value={selectedPartId}
                  onChange={(e) => setSelectedPartId(e.target.value)}
                >
                  <option value="">Select a Part</option>
                  {parts
                    .filter(
                      (part) =>
                        !associatedParts.some((ap) => ap._id === part._id)
                    )
                    .map((part) => (
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
                    <li key={part._id} className="list-group-item d-flex justify-content-between align-items-center">
                      {part.name} (Stock: {part.stock}, Price: {part.price})
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemovePart(part._id!)}
                      >
                        Remove
                      </button>
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
