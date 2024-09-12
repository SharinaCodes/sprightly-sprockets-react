import React, { useEffect } from "react";
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
      <td>{part.name}</td> {/* Accessing fields directly */}
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
          <Link
            to={`/edit-part/${part._id}`} // Use the part's _id field for the edit link
            className="btn btn-link p-0 mr-2"
          >
            <FaRegEdit />
          </Link>
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => {
              if (part._id) {
                handleDelete(part._id); // Call handleDelete with the _id directly
              } else {
                console.error("Part ID is undefined");
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
