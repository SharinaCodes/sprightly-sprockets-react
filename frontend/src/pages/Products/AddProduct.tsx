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

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    min: "",
    max: "",
  });

  const [associatedParts, setAssociatedParts] = useState<PartInterface[]>([]); // Parts associated with the product
  const [selectedPartId, setSelectedPartId] = useState<string>(""); // ID of the selected part to associate

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch all parts from Redux state
  const { parts, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.part
  );
  const { isSuccess: productSuccess, isError: productError } = useSelector(
    (state: RootState) => state.product
  );

  // Fetch parts when component mounts
  useEffect(() => {
    dispatch(getParts());
  }, [dispatch]);

  // Handle success/error state after product creation
  useEffect(() => {
    if (productSuccess) {
      toast.success("Product added successfully!");
      navigate("/products");
      dispatch(reset());
    }

    if (productError) {
      toast.error(message || "Failed to add product.");
    }
  }, [productSuccess, productError, message, navigate, dispatch]);

  // Handle input change for product data
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle selection of a part to associate with the product
  const handleAddPart = () => {
    const selectedPart = parts.find((part) => part._id === selectedPartId);
    if (
      selectedPart &&
      !associatedParts.some((part) => part._id === selectedPartId)
    ) {
      setAssociatedParts([...associatedParts, selectedPart]);
      setSelectedPartId("");
    } else {
      toast.warn("Part is already associated with this product.");
    }
  };

  // Handle form submission for the product
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Convert associatedParts to the format required by the API
      const associatedPartsForApi: AssociatedPartForAPI[] = associatedParts.map((part) => ({
        partId: part._id as string, // Cast to string as partId should always be defined in this context
        name: part.name,
      }));
  
      const newProduct: ProductInterface = {
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        min: parseInt(formData.min),
        max: parseInt(formData.max),
        associatedParts: associatedPartsForApi, // Pass the array of AssociatedPartForAPI objects here
      };
  
      dispatch(createProduct(newProduct));
  
      if (!isError) {
        toast.success("Product added successfully!");
        navigate("/products");
      } else {
        toast.error(message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };
  
  

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
                    <li key={index} className="list-group-item">
                      {part.name} (Stock: {part.stock}, Price: {part.price})
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
