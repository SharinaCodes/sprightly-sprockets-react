import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get part ID from route
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { getParts, updatePart, reset } from "../../features/parts/partSlice"; // Import updatePart action
import Spinner from "../../components/Spinner";
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

const EditPart: React.FC = () => {
  const { partId } = useParams<{ partId: string }>(); // Get the part ID from the URL
  const [formData, setFormData] = useState<FormData | null>(null); // Start with null formData

  const { parts, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.part
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!parts.length) {
      dispatch(getParts()); // Fetch parts if not already in the state
    } else {
      const partToEdit = parts.find((part) => part._id === partId);
      if (partToEdit) {
        setFormData({
          name: partToEdit.name,
          price: String(partToEdit.price),
          stock: String(partToEdit.stock),
          min: String(partToEdit.min),
          max: String(partToEdit.max),
          type: partToEdit.type as "InHouse" | "Outsourced",
          machineId: partToEdit.machineId || "",
          companyName: partToEdit.companyName || "",
        });
      }
    }
  }, [dispatch, partId, parts]);

  // Monitor Redux state for success/error
  useEffect(() => {
    if (isSuccess) {
      toast.success("Part updated successfully!");
      dispatch(reset()); // Reset the state after success
      navigate("/parts"); // Navigate away after success
    }

    if (isError) {
      toast.error(message || "Failed to update part.");
      dispatch(reset()); // Reset the state after error
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData) {
      const updatedPart = {
        _id: partId, // Include the part ID to update
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        min: parseInt(formData.min),
        max: parseInt(formData.max),
        type: formData.type,
        machineId: formData.type === "InHouse" ? formData.machineId : null,
        companyName: formData.type === "Outsourced" ? formData.companyName : null,
      };

      dispatch(updatePart(updatedPart));
    }
  };

  // Show loading or spinner until part data is fetched
  if (!formData) {
    return <Spinner />;
  }

  return (
    <div className="edit-part">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <button className="btn btn-light" onClick={() => navigate(-1)}>
              Go Back
            </button>

            <h1 className="display-4 text-center">Edit Part</h1>
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
                  value={formData.type || ""} // Ensure the dropdown is controlled by formData
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
                    type="text"
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
                value="Update Part"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPart;
