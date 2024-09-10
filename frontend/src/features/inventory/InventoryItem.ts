import { ObjectId } from "bson"; // Import ObjectId from the mongodb package

export default class InventoryItem {
  protected id: ObjectId; // Add the id field
  protected name: string;
  protected price: number;
  protected stock: number;
  protected min: number;
  protected max: number;

  constructor(id: ObjectId, name: string, price: number, stock: number, min: number, max: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.min = min;
    this.max = max;
  }

  getId(): ObjectId {
    return this.id;
  }

  setId(id: ObjectId) {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    this.price = price;
  }

  getStock(): number {
    return this.stock;
  }

  setStock(stock: number): void {
    if (stock < this.min || stock > this.max) {
      throw new Error("Stock must be between min and max values");
    }
    this.stock = stock;
  }

  getMin(): number {
    return this.min;
  }

  setMin(min: number): void {
    if (min >= this.max) {
      throw new Error("Min should be less than Max");
    }
    this.min = min;
  }

  getMax(): number {
    return this.max;
  }

  setMax(max: number): void {
    if (max <= this.min) {
      throw new Error("Max should be greater than Min");
    }
    this.max = max;
  }

  // Polymorphic method to be overridden
  findItem(criteria: string): InventoryItem | null {
    throw new Error("Method not implemented.");
  }
}
