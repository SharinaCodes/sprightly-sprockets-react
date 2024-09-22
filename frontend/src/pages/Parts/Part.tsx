import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { PartInterface } from "../../features/inventory/Part";
import {User} from "../../features/auth/authSlice";

interface PartComponentProps {
  part: PartInterface;
  handleDelete: (id: string | undefined) => void;
  user?: User; // Properly type the user as optional
}

const PartComponent: React.FC<PartComponentProps> = ({ part, handleDelete, user }) => (
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
    {user && ( // Conditionally render edit and delete actions if user is logged in
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
    )}
  </tr>
);

export default PartComponent;
