import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { PartInterface } from "../../features/inventory/Part";
import {User} from "../../features/auth/authSlice";

/**
 * Props for the PartComponent.
 * 
 * @interface PartComponentProps
 * @property {PartInterface} part - The part object containing details about the part.
 * @property {(id: string | undefined) => void} handleDelete - Function to handle the deletion of a part by its ID.
 * @property {User} [user] - Optional user object associated with the part.
 */
interface PartComponentProps {
  part: PartInterface;
  handleDelete: (id: string | undefined) => void;
  user?: User; // Properly type the user as optional
}

/**
 * PartComponent is a functional component that renders a table row representing a part.
 * It displays part details such as name, price, stock, min, max, and type-specific information.
 * If a user is logged in, it also provides edit and delete actions.
 *
 * @component
 * @param {PartComponentProps} props - The properties object.
 * @param {Part} props.part - The part object containing details to display.
 * @param {Function} props.handleDelete - The function to call when the delete button is clicked.
 * @param {User} [props.user] - The user object to determine if edit and delete actions should be rendered.
 * @returns {JSX.Element} A table row element displaying part details and actions.
 */
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
