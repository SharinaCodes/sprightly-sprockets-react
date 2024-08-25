import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import Part from '../../features/inventory/Part';

interface PartComponentProps {
  part: Part;  // Using the Part class directly
  handleDelete: (id: string) => void;
}

const PartComponent: React.FC<PartComponentProps> = ({ part, handleDelete }) => (
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
        <Link to={`/edit-part/${part.getName()}`} className="btn btn-link p-0 mr-2">
          <FaRegEdit />
        </Link>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => handleDelete(part.getName())}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </td>
  </tr>
);

export default PartComponent;
