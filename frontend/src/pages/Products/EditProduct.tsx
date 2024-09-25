import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import mongoose from "mongoose";
import { RootState, AppDispatch } from "../../app/store";
import { getParts } from "../../features/parts/partSlice";
import { lookupProductById, updateProduct, reset } from "../../features/products/productSlice";
import { ProductInterface, AssociatedPartForAPI } from "../../features/inventory/Product";
import { PartInterface } from "../../features/inventory/Part";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import NotFoundComponent from "../../components/NotFound"; // Import the NotFoundComponent

interface FormData {
  name: string;
  price: string;
  stock: string;
  min: string;
  max: string;
}

/**
 * Component for editing an existing product.
 * 
 * @component
 * @example
 * return (
 *   <EditProduct />
 * )
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @remarks
 * This component allows users to edit an existing product by filling out a form with product details and managing associated parts.
 * It handles form submission, input changes, and dispatches actions to the Redux store for updating the product.
 * 
 * @function
 * @name EditProduct
 * 
 * @description
 * The `EditProduct` component manages the state for the product form, handles form submission, and interacts with the Redux store to dispatch actions for fetching the product, updating the product, and fetching associated parts.
 * It also includes logic for checking the validity of the product ID.
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
 * @property {string} _id - The unique identifier of the product.
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
 * - Fetches the product and associated parts on component mount.
 * - Handles success and error states after product update.
 * 
 * @hook
 * @name useState
 * @description
 * Manages the state for form data, associated parts, selected part ID, form submission flag, and the invalid product ID flag.
 * 
 * @hook
 * @name useNavigate
 * @description
 * Provides navigation functionality to redirect users after form submission.
 * 
 * @hook
 * @name useDispatch
 * @description
 * Provides dispatch functionality for Redux actions.
 * 
 * @hook
 * @name useSelector
 * @description
 * Selects the part and product state from the Redux store.
 * 
 * @function
 * @name handleProductChange
 * @description
 * Handles input changes for the product form fields.
 * 
 * @function
 * @name handleAddPart
 * @description
 * Adds a part to the associated parts list if it hasn't been added already.
 * 
 * @function
 * @name handleRemovePart
 * @description
 * Removes a part from the associated parts list.
 * 
 * @function
 * @name onSubmit
 * @description
 * Handles form submission to update the product. It prepares the product object and associated parts for the API call.
 * 
 * @function
 * @name Spinner
 * @description
 * Displays a loading spinner while product details and parts are being fetched.
 * 
 * @function
 * @name NotFoundComponent
 * @description
 * Displays a "Not Found" component if the product ID is invalid or not found.
 * 
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event for form inputs.
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 */
const EditProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    stock: "",
    min: "",
    max: "",
  });
  const [associatedParts, setAssociatedParts] = useState<PartInterface[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isInvalidId, setIsInvalidId] = useState(false); // Track if the product ID is invalid

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { parts, isLoading: partsLoading } = useSelector((state: RootState) => state.part);
  const { product, isLoading, isSuccess, isError, message } = useSelector((state: RootState) => state.product);

  // Fetch product details and parts on mount
  useEffect(() => {
    dispatch(reset());
    
    // Check if productId exists and is valid before dispatching actions
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      setIsInvalidId(true); // Set the invalid flag if the ID is not valid
      return;
    }
    
    dispatch(lookupProductById(productId)); // Fetch the product using productId
    dispatch(getParts()); // Fetch all parts
  }, [dispatch, productId]);

  // Pre-fill form when product data is loaded
  useEffect(() => {
    if (product && product._id === productId) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        min: product.min.toString(),
        max: product.max.toString(),
      });

      const uniquePartIds = new Set<string>();

      const associatedPartsAsParts: PartInterface[] = product.associatedParts.map((associatedPart) => {
        if ("partId" in associatedPart) {
          const matchingPart = parts.find((part) => part._id === associatedPart.partId);
          if (matchingPart && !uniquePartIds.has(matchingPart._id!)) {
            uniquePartIds.add(matchingPart._id!);
            return matchingPart;
          }
          return {
            _id: associatedPart.partId,
            name: associatedPart.name,
            price: 0,
            stock: 0,
            min: 0,
            max: 0,
            type: "Unknown" as "InHouse" | "Outsourced",
          };
        } else {
          const part = associatedPart as PartInterface;
          if (!uniquePartIds.has(part._id!)) {
            uniquePartIds.add(part._id!);
            return part;
          }
          return null; // Ignore duplicate entries
        }
      }).filter(Boolean) as PartInterface[];

      setAssociatedParts(associatedPartsAsParts);
    }
  }, [product, productId, parts]);

  // Handle success/error state after product update
  useEffect(() => {
    if (isSuccess && formSubmitted) {
      toast.success("Product updated successfully!");
      navigate("/products");
      dispatch(reset()); // Reset state after success
    }

    if (isError && formSubmitted) {
      toast.error(message || "Failed to update product.");
      dispatch(reset()); // Reset state after error
    }
  }, [isSuccess, isError, message, navigate, dispatch, formSubmitted]);

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

  // Handle form submission for the product update
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true); // Set form submission flag

    try {
      const associatedPartsForAPI: AssociatedPartForAPI[] = associatedParts.map((part) => ({
        partId: part._id as string, // Ensure the part ID is used
        name: part.name,
      }));

      const updatedProduct: ProductInterface = {
        _id: productId!,
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        min: parseInt(formData.min),
        max: parseInt(formData.max),
        associatedParts: associatedPartsForAPI, // Pass only partId and name
      };

      dispatch(updateProduct(updatedProduct));
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  // If the ID is invalid, show a Not Found component
  if (isInvalidId) {
    return <NotFoundComponent />;
  }

  // Display spinner while loading product or parts
  if (isLoading || partsLoading) {
    return <Spinner />;
  }

  return (
    <div className="edit-product">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <button className="btn btn-light" onClick={() => navigate(-1)}>
              Go Back
            </button>

            <h1 className="display-4 text-center">Edit Product</h1>
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
                    .filter((part) => !associatedParts.some((ap) => ap._id === part._id))
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
                  {associatedParts.map((part) => (
                    <li key={part._id} className="list-group-item d-flex justify-content-between align-items-center">
                      {part.name}
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

              <input type="submit" className="btn btn-info btn-block mt-4" value="Update Product" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
