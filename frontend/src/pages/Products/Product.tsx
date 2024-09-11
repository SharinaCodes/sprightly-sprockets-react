import React from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import Product from "../../features/inventory/Product";
interface ProductComponentProps {
  product: Product; // Using the Product class directly
  handleDelete: (id: string) => void;
}

const ProductComponent: React.FC<ProductComponentProps> = ({
  product,
  handleDelete,
}) => (
  <tr className="border-bottom">
    <td>{product.getName()}</td>
    <td>{product.getPrice()}</td>
    <td>{product.getStock()}</td>
    <td>{product.getMin()}</td>
    <td>{product.getMax()}</td>
    <td className="text-center">
      <div className="d-flex justify-content-center">
        <Link
          to={`/edit-product/${product.getId()}`}
          className="btn btn-link p-0 mr-2"
        >
          <FaRegEdit />
        </Link>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => {
            const productId = product.getId(); // Get the ID
            if (productId) {
              handleDelete(productId); // Only call handleDelete if ID exists
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

export default ProductComponent;
