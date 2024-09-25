export default class InventoryItem {
  protected id?: string;
  protected name: string;
  protected price: number;
  protected stock: number;
  protected min: number;
  protected max: number;

  /**
   * Creates an instance of InventoryItem.
   *
   * @param name - The name of the inventory item.
   * @param price - The price of the inventory item.
   * @param stock - The current stock level of the inventory item.
   * @param min - The minimum stock level for the inventory item.
   * @param max - The maximum stock level for the inventory item.
   * @param id - (Optional) The unique identifier for the inventory item.
   */
  constructor(
    name: string,
    price: number,
    stock: number,
    min: number,
    max: number,
    id?: string
  ) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.min = min;
    this.max = max;
  }

  /**
   * Retrieves the ID of the inventory item.
   *
   * @returns {string | undefined} The ID of the inventory item, or undefined if the ID is not set.
   */
  getId(): string | undefined {
    return this.id;
  }

  /**
   * Sets the ID of the inventory item.
   *
   * @param id - The new ID to be assigned to the inventory item.
   */
  setId(id: string) {
    this.id = id;
  }

  /**
   * Retrieves the name of the inventory item.
   *
   * @returns {string} The name of the inventory item.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Sets the name of the inventory item.
   *
   * @param name - The new name to be assigned to the inventory item.
   */
  setName(name: string): void {
    this.name = name;
  }

  /**
   * Retrieves the price of the inventory item.
   *
   * @returns {number} The price of the inventory item.
   */
  getPrice(): number {
    return this.price;
  }

  /**
   * Sets the price of the inventory item.
   *
   * @param price - The new price to be assigned to the inventory item.
   */
  setPrice(price: number): void {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    this.price = price;
  }

  /**
   * Retrieves the stock level of the inventory item.
   *
   * @returns {number} The stock level of the inventory item.
   */
  getStock(): number {
    return this.stock;
  }

  /**
   * Sets the stock level of the inventory item.
   *
   * @param stock - The new stock level to be assigned to the inventory item.
   */
  setStock(stock: number): void {
    if (stock < this.min || stock > this.max) {
      throw new Error("Stock must be between min and max values");
    }
    this.stock = stock;
  }

  /**
   * Retrieves the minimum stock level of the inventory item.
   *
   * @returns {number} The minimum stock level of the inventory item.
   */
  getMin(): number {
    return this.min;
  }

  /**
   * Sets the minimum stock level of the inventory item.
   *
   * @param min - The new minimum stock level to be assigned to the inventory item.
   */
  setMin(min: number): void {
    if (min >= this.max) {
      throw new Error("Min should be less than Max");
    }
    this.min = min;
  }

  /**
   * Retrieves the maximum value for the inventory item.
   *
   * @returns {number} The maximum value.
   */
  getMax(): number {
    return this.max;
  }

  /**
   * Sets the maximum value for the inventory item.
   *
   * @param max - The new maximum value.
   */
  setMax(max: number): void {
    if (max <= this.min) {
      throw new Error("Max should be greater than Min");
    }
    this.max = max;
  }

  /**
   * Checks if the inventory item is in stock.
   *
   * @returns {boolean} True if the stock level is greater than 0, false otherwise.
   */
  findItem(criteria: string): InventoryItem | null {
    throw new Error("Method not implemented.");
  }
}
