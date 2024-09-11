import InventoryItem from './InventoryItem';
import Part from './Part';
import {ObjectId} from 'bson';

export default class Product extends InventoryItem {
  private associatedParts: Part[];

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

  getAssociatedParts(): Part[] {
    return this.associatedParts;
  }

  addPart(part: Part): void {
    this.associatedParts.push(part);
  }

  removePart(part: Part): void {
    this.associatedParts = this.associatedParts.filter((p) => p !== part);
  }

  // Polymorphic method override
  findItem(criteria: string): Product | null {
    const foundPart = this.associatedParts.find(part =>
      part.getName().toLowerCase() === criteria.toLowerCase()
    );
    return foundPart ? this : null;
  }
}
