import InventoryItem from './InventoryItem';

/**
 * Represents a part in the inventory.
 *
 * @extends InventoryItem
 * @class
 * */
export default class Part extends InventoryItem {
  private type: string;
  private machineId?: string | null;
  private companyName?: string | null;

  /**
   * Constructs a new Part instance.
   * 
   * @param name - The name of the part.
   * @param price - The price of the part.
   * @param stock - The current stock level of the part.
   * @param min - The minimum stock level allowed for the part.
   * @param max - The maximum stock level allowed for the part.
   * @param type - The type of the part.
   * @param machineId - (Optional) The machine ID associated with the part, if applicable.
   * @param companyName - (Optional) The company name associated with the part, if applicable.
   */
  constructor(
    name: string,
    price: number,
    stock: number,
    min: number,
    max: number,
    type: string,
    machineId?: string | null,
    companyName?: string | null
  ) {
    super(name, price, stock, min, max);
    this.type = type;
    this.machineId = machineId;
    this.companyName = companyName;
  }

  
  /**
   * Retrieves the type of the part.
   *
   * @returns {string} The type of the part.
   */
  getType(): string {
    return this.type;
  }

  /**
   * Sets the type of the part.
   *
   * @param type - The type to set for the part.
   */
  setType(type: string): void {
    this.type = type;
  }

  /**
   * Retrieves the machine ID associated with this part.
   *
   * @returns {string | null} The machine ID if it exists, otherwise `null`.
   */
  getMachineId(): string | null {
    return this.machineId ? this.machineId : null;
  }

  /**
   * Sets the machine ID for the part.
   * 
   * @param machineId - The machine ID to set. Must be a string or null.
   * @throws Will throw an error if the part type is "InHouse" and the machine ID is null.
   */
  setMachineId(machineId: string | null): void {
    if (this.type === "InHouse" && !machineId) {
      throw new Error("InHouse parts must have a machine ID");
    }
    this.machineId = machineId;
  }

  /**
   * Retrieves the company name associated with the part.
   *
   * @returns {string | null} The company name if it exists, otherwise `null`.
   */
  getCompanyName(): string | null {
    return this.companyName ? this.companyName : null;
  }

  /**
   * Sets the company name for the part.
   * 
   * @param companyName - The name of the company. Must be provided if the part type is "Outsourced".
   * @throws {Error} If the part type is "Outsourced" and the company name is not provided.
   */
  setCompanyName(companyName: string | null): void {
    if (this.type === "Outsourced" && !companyName) {
      throw new Error("Outsourced parts must have a company name");
    }
    this.companyName = companyName;
  }

  
  /**
   * Finds an item based on the given criteria.
   *
   * @param criteria - The search criteria to match the item's name.
   * @returns The part if the criteria matches the item's name, otherwise null.
   */
  findItem(criteria: string): Part | null {
    return this.name.toLowerCase() === criteria.toLowerCase() ? this : null;
  }
}

export interface PartInterface {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  min: number;
  max: number;
  type: 'InHouse' | 'Outsourced';
  machineId?: string | null;
  companyName?: string | null;
}

