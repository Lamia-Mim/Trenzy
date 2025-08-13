import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import productModel from '../models/productModel.js';

jest.setTimeout(20000); // give enough time for in-memory server startup

let mongoServer;

/**
 * Setup in-memory MongoDB server and connect mongoose before tests
 * @returns {Promise<void>}
 */

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { dbName: 'test' });
});

/**
 * Clearing database after each test 
 * @returns {Promise<void>}
 */

afterEach(async () => {
    const db = mongoose.connection.db;
    await db.dropDatabase();
});

/**
 * Disconnecting mongoose and stop MongoDB server after all tests
 * @returns {Promise<void>}
 */

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('productModel schema', () => {
    it('validates required fields', async () => {
        const p = new productModel({});

        try {
            await p.validate();
        } catch (err) {
            //checking errors
            expect(err.errors.name).toBeDefined();
            expect(err.errors.price).toBeDefined();

            expect(err.errors.category).toBeDefined();
            expect(err.errors.subCategory).toBeDefined();

            // expect(err.errors.sizes).toBeDefined();
            expect(err.errors.description).toBeDefined();
            expect(err.errors.date).toBeDefined();
        }

    });

    it('rejects wrong data type for price', async () => {
        const p = new productModel({
            name: 'X',
            description: 'desc',
            price: 'not-a-number', 
            image: ['img1'],
            category: 'cat',
            subCategory: 'sub',
            sizes: ['M'],
            date: Date.now(),
        });
        await expect(p.validate()).rejects.toThrow();
    });

    it('allows bestSeller to be undefined', async () => {
        const p = new productModel({
            name: 'X',
            description: 'desc',
            price: 100,
            image: ['img1'],
            category: 'cat',
            subCategory: 'sub',
            sizes: ['M'],
            date: Date.now(),
        });

        await expect(p.validate()).resolves.toBeUndefined();
        expect(p.bestSeller).toBeUndefined();
    });

   /**
   * Testing saving a valid product instance
   * @returns {Promise<void>}
   */

    it('saves a valid product', async () => {
        const payload = {
            name: 'Test Product',
            description: 'A product for tests',
            price: 1200,
            image: ['url1', 'url2'],
            category: 'Men',
            subCategory: 'Shirts',
            sizes: ['M', 'L'],
            date: Date.now(),
            bestSeller: true,
        };

        const saved = await new productModel(payload).save();
        expect(saved._id).toBeDefined();
        expect(saved.name).toBe(payload.name);
        expect(saved.price).toBe(payload.price);
        expect(Array.isArray(saved.image)).toBe(true);
    });
});
