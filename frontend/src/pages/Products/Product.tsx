import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import Product from '../../features/inventory/Product';
import { ObjectId } from "bson";

interface ProductComponentProps {
  product: Product;  // Using the Product class directly
  handleDelete: (id: ObjectId) => void;
}

const ProductComponent: React.FC<ProductComponentProps> = ({ product, handleDelete }) => (
  <tr className="border-bottom">
    <td>{product.getName()}</td>
    <td>{product.getPrice()}</td>
    <td>{product.getStock()}</td>
    <td>{product.getMin()}</td>
    <td>{product.getMax()}</td>
    <td className="text-center">
      <div className="d-flex justify-content-center">
        <Link to={`/edit-product/${product.getId()}`} className="btn btn-link p-0 mr-2">
          <FaRegEdit />
        </Link>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => handleDelete(product.getId())}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </td>
  </tr>
);

export default ProductComponent;
