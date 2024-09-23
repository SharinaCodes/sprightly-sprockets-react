import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { getParts } from "../../features/parts/partSlice";
import { lookupProductById, updateProduct, reset } from "../../features/products/productSlice";
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

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { parts, isLoading: partsLoading } = useSelector((state: RootState) => state.part);
  const { product, isLoading, isSuccess, isError, message } = useSelector((state: RootState) => state.product);

  // Fetch product details and parts on mount
  useEffect(() => {
    dispatch(reset());
    if (productId) {
      dispatch(lookupProductById(productId)); // Fetch the product using productId
    }
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

      // Avoid duplicating parts by creating a Set for unique IDs
      const uniquePartIds = new Set<string>();

      const associatedPartsAsParts: PartInterface[] = product.associatedParts.map((associatedPart) => {
        if ('partId' in associatedPart) {
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
      // Map associatedParts to only include partId and name
      const associatedPartsForAPI: AssociatedPartForAPI[] = associatedParts.map((part) => ({
        partId: part._id as string, // Ensure the part ID is used
        name: part.name,
      }));

      // Create the updated product object
      const updatedProduct: ProductInterface = {
        _id: productId,
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
