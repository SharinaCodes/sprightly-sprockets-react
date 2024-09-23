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

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    stock: "",
    min: "",
    max: "",
  });
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
