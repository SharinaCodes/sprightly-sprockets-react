import {useEffect} from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { ProductInterface } from "../../features/inventory/Product";

interface ProductComponentProps {
  product: ProductInterface;
  handleDelete: (id: string | undefined) => void;
}

const ProductComponent: React.FC<ProductComponentProps> = ({
  product,
  handleDelete,
}) => (
  <tr className="border-bottom">
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.stock}</td>
    <td>{product.min}</td>
    <td>{product.max}</td>
    <td className="text-center">
      <div className="d-flex justify-content-center">
        <Link
          to={`/edit-product/${product._id}`}
          className="btn btn-link p-0 mr-2"
        >
          <FaRegEdit />
        </Link>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => {
            const productId = product._id; // Get the ID
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
