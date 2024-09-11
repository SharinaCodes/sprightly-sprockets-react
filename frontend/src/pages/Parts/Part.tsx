import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import Part from "../../features/inventory/Part";

interface PartComponentProps {
  part: Part; // Using the Part class directly
  handleDelete: (id: string | undefined) => void;
}

const PartComponent: React.FC<PartComponentProps> = ({
  part,
  handleDelete,
}) => (
  <tr className="border-bottom">
    <td>{part.getName()}</td>
    <td>{part.getPrice()}</td>
    <td>{part.getStock()}</td>
    <td>{part.getMin()}</td>
    <td>{part.getMax()}</td>
    <td>
      {part.getType() === "InHouse"
        ? `Machine ID: ${part.getMachineId()}`
        : `Company Name: ${part.getCompanyName()}`}
    </td>
    <td className="text-center">
      <div className="d-flex justify-content-center">
        <Link
          to={`/edit-part/${part.getId()}`}
          className="btn btn-link p-0 mr-2"
        >
          <FaRegEdit />
        </Link>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => {
            const partId = part.getId(); // Get the ID
            if (partId) {
              handleDelete(partId); // Only call handleDelete if ID exists
            } else {
              console.error("Product ID is undefined");
            }
          }}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </td>
  </tr>
);

export default PartComponent;
