import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { PartInterface } from "../../features/inventory/Part";

interface PartComponentProps {
  part: PartInterface; // Using PartInterface instead of the Part class
  handleDelete: (id: string | undefined) => void;
}

const PartComponent: React.FC<PartComponentProps> = ({
  part,
  handleDelete,
}) => (
  <tr className="border-bottom">
    <td>{part.name}</td>
    <td>{part.price}</td>
    <td>{part.stock}</td>
    <td>{part.min}</td>
    <td>{part.max}</td>
    <td>
      {part.type === "InHouse"
        ? `Machine ID: ${part.machineId}`
        : `Company Name: ${part.companyName}`}
    </td>
    <td className="text-center">
      <div className="d-flex justify-content-center">
        <Link to={`/edit-part/${part._id}`} className="btn btn-link p-0 mr-2">
          <FaRegEdit />
        </Link>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => handleDelete(part._id)}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </td>
  </tr>
);

export default PartComponent;
