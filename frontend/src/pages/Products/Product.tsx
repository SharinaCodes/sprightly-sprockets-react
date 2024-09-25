import {useEffect} from "react";
import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { ProductInterface } from "../../features/inventory/Product";

interface ProductComponentProps {
  product: ProductInterface;
  handleDelete: (id: string | undefined) => void;
}

/**
 * Component for rendering a single product in a table row.
 * 
 * @component
 * @example
 * const product = {
 *   _id: "12345",
 *   name: "Bike Helmet",
 *   price: 49.99,
 *   stock: 20,
 *   min: 5,
 *   max: 50,
 * };
 * return (
 *   <ProductComponent product={product} handleDelete={handleDeleteFunction} />
 * )
 * 
 * @returns {JSX.Element} The rendered table row displaying product details.
 * 
 * @remarks
 * This component displays product details in a table row format and provides action buttons for editing and deleting the product.
 * 
 * @function
 * @name ProductComponent
 * 
 * @description
 * The `ProductComponent` renders a single product's information (name, price, stock, min, and max) in a table row. It also includes links for editing the product and a button to delete the product.
 * 
 * @typedef {Object} ProductComponentProps
 * @property {ProductInterface} product - The product object containing details to display.
 * @property {Function} handleDelete - The function to be called when the delete button is clicked, passing the product ID.
 * 
 * @typedef {Object} ProductInterface
 * @property {string} _id - The unique identifier of the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {number} stock - The stock quantity of the product.
 * @property {number} min - The minimum stock quantity.
 * @property {number} max - The maximum stock quantity.
 * 
 * @hook
 * @name Link
 * @description
 * Provides navigation functionality to the edit product page for the given product ID.
 * 
 * @function
 * @name handleDelete
 * @description
 * Called when the delete button is clicked. It passes the product ID to the function to trigger the product's deletion.
 * 
 * @param {ProductComponentProps} props - The component props.
 * @param {ProductInterface} props.product - The product object to display.
 * @param {Function} props.handleDelete - The function to handle the deletion of the product.
 * 
 * @param {string} props.product._id - The unique identifier for the product.
 * @param {string} props.product.name - The name of the product.
 * @param {number} props.product.price - The price of the product.
 * @param {number} props.product.stock - The stock quantity of the product.
 * @param {number} props.product.min - The minimum stock quantity of the product.
 * @param {number} props.product.max - The maximum stock quantity of the product.
 * 
 * @function
 * @name FaRegEdit
 * @description
 * The FontAwesome edit icon, which acts as a button link to navigate to the product edit page.
 * 
 * @function
 * @name FaRegTrashAlt
 * @description
 * The FontAwesome trash icon, which acts as a button to trigger the deletion of the product.
 */
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
