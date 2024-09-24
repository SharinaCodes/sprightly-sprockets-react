const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const PartInventory = require('../controllers/PartInventory');
const Part = require('../models/partModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('PartInventory - addItem', () => {
  let partInventory;
  beforeEach(() => {
    partInventory = new PartInventory();
  });

  it('should add a new InHouse part with valid data', async () => {
    const req = {
      body: { name: 'Gear', price: 12.99, stock: 20, min: 5, max: 100, type: 'InHouse', machineId: 'MCH-001' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await partInventory.addItem(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Gear',
      price: 12.99,
      stock: 20,
      machineId: 'MCH-001'
    }));
  });

  it('should fail to add a part with missing required fields', async () => {
    const req = {
      body: { price: 12.99, stock: 20 }  // Missing required fields like name, min, max, and type
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await partInventory.addItem(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('Part validation failed') // Allow flexible matching for validation errors
    }));
  });
});

describe('PartInventory - updateItem', () => {
  let partInventory;
  beforeEach(() => {
    partInventory = new PartInventory();
  });

  it('should update an existing part with valid data', async () => {
    // First, create a part in the mock database
    const part = await Part.create({ name: 'Bolt', price: 0.99, stock: 100, min: 10, max: 500, type: 'InHouse', machineId: 'MCH-002' });

    const req = {
      params: { id: part._id },
      body: { name: 'Updated Bolt', price: 1.25, stock: 150, min: 15, max: 600, type: 'Outsourced', companyName: 'Fasteners Inc.' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await partInventory.updateItem(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Updated Bolt',
      price: 1.25,
      stock: 150,
      companyName: 'Fasteners Inc.'
    }));
  });

  it('should return 404 if part is not found', async () => {
    const req = {
      params: { id: new mongoose.Types.ObjectId() },  // Random ObjectId not in the DB
      body: { name: 'Non-existent part' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await partInventory.updateItem(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Part not found' });
  });
});
