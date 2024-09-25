import InventoryItem from "./InventoryItem";
import Part from "./Part";
import { PartInterface } from "./Part";

export default class Product extends InventoryItem {
  private associatedParts: Part[];

  /**
   * Creates an instance of a Product.
   * 
   * @param name - The name of the product.
   * @param price - The price of the product.
   * @param stock - The current stock level of the product.
   * @param min - The minimum stock level allowed for the product.
   * @param max - The maximum stock level allowed for the product.
   * @param associatedParts - An optional array of parts associated with the product.
   */
  constructor(
    name: string,
    price: number,
    stock: number,
    min: number,
    max: number,
    associatedParts: Part[] = []
  ) {
    super(name, price, stock, min, max);
    this.associatedParts = associatedParts;
  }

  /**
   * Retrieves the list of associated parts for the product.
   *
   * @returns {Part[]} An array of associated parts.
   */
  getAssociatedParts(): Part[] {
    return this.associatedParts;
  }

  /**
   * Adds a part to the list of associated parts.
   *
   * @param part - The part to be added to the associated parts list.
   */
  addPart(part: Part): void {
    this.associatedParts.push(part);
  }

  /**
   * Removes a specified part from the associated parts list.
   *
   * @param part - The part to be removed from the associated parts.
   */
  removePart(part: Part): void {
    this.associatedParts = this.associatedParts.filter((p) => p !== part);
  }

  
  /**
   * Searches for an associated part by its name within the product's associated parts.
   * The search is case-insensitive.
   *
   * @param criteria - The name of the part to search for.
   * @returns The product if the part is found, otherwise `null`.
   */
  findItem(criteria: string): Product | null {
    const foundPart = this.associatedParts.find(
      (part) => part.getName().toLowerCase() === criteria.toLowerCase()
    );
    return foundPart ? this : null;
  }
}

/**
 * Represents an associated part for the API.
 * 
 * @interface AssociatedPartForAPI
 * @property {string} partId - The unique identifier for the part.
 * @property {string} name - The name of the part.
 */
export interface AssociatedPartForAPI {
  partId: string;
  name: string;
}

/**
 * Interface representing a product in the inventory.
 * 
 * @property {_id} [optional] - The unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {number} stock - The current stock level of the product.
 * @property {number} min - The minimum stock level for the product.
 * @property {number} max - The maximum stock level for the product.
 * @property {(PartInterface | AssociatedPartForAPI)[]} associatedParts - An array of associated parts, which can be either of type PartInterface or AssociatedPartForAPI.
 */
export interface ProductInterface {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  min: number;
  max: number;
  associatedParts: (PartInterface | AssociatedPartForAPI)[];
}

