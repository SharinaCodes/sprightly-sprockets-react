import InventoryItem from './InventoryItem';
import {ObjectId} from 'bson';

export default class Part extends InventoryItem {
  private type: string;
  private machineId?: string | null;
  private companyName?: string | null;

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

  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }

  getMachineId(): string | null {
    return this.machineId ? this.machineId : null;
  }

  setMachineId(machineId: string | null): void {
    if (this.type === "InHouse" && !machineId) {
      throw new Error("InHouse parts must have a machine ID");
    }
    this.machineId = machineId;
  }

  getCompanyName(): string | null {
    return this.companyName ? this.companyName : null;
  }

  setCompanyName(companyName: string | null): void {
    if (this.type === "Outsourced" && !companyName) {
      throw new Error("Outsourced parts must have a company name");
    }
    this.companyName = companyName;
  }

  // Polymorphic method override
  findItem(criteria: string): Part | null {
    return this.name.toLowerCase() === criteria.toLowerCase() ? this : null;
  }
}

// Part.ts
export interface PartInterface {
  id?: string;
  name: string;
  price: number;
  stock: number;
  min: number;
  max: number;
  type: 'InHouse' | 'Outsourced';
  machineId?: string | null;
  companyName?: string | null;
}

