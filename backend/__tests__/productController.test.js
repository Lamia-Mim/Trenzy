import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import productModel from '../models/productModel.js';
import { v2 as cloudinary } from 'cloudinary';
import { jest } from '@jest/globals';
jest.mock('../models/productModel.js');
jest.mock('cloudinary');


/**
 * Creating a mock Express.js response object with json method mocked.
 * @returns {Object} Mocked response object with json as jest.fn()
 * 
 */

const mockRes = () => {
  const res = {};
  res.json = jest.fn();
  return res;
};

/**
 * Test suite for Product Controller functions.
 */

describe('Product Controller', () => {

  /**
   * Mocking console.log and console.error to silence output during tests.
   */

  beforeAll(() => {

    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'log').mockImplementation(() => { });

  });

  /**
  * Restoring original console methods after tests.
  */

  afterAll(() => {

    console.error.mockRestore();
    console.log.mockRestore();

  });

  /**
   * Clearing all mocks 
  */

  afterEach(() => {

    jest.clearAllMocks();

  });

  /**
  * Testing  listProducts function.
  */

  describe('listProducts', () => {

    /**
     * Should return a list of products
    */

    it('should return products list', async () => {

      const req = {};
      const res = mockRes();
      productModel.find.mockResolvedValueOnce([{ name: 'Test Product' }]);
      await listProducts(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: true, products: [{ name: 'Test Product' }] }); 

    });

    /**
    * Should handle database errors.
    */

    it('should handle error', async () => {

      const req = {};
      const res = mockRes();
      productModel.find.mockRejectedValueOnce(new Error('Database Error'));
      await listProducts(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Database Error' });
    });

  });

  /**
  * Testing  addProducts function.
  */

  describe('addProduct', () => {

/**
 * Should add a product with images uploaded via Cloudinary.
 */

    it('should add product with images', async () => {
      const req = {
        body: {
          name: 'T-Shirt',
          description: 'Nice ',
          price: '1900',
          category: 'Men',
          subCategory: 'T-shirts',
          sizes: JSON.stringify(['S', 'M']),
          bestSeller: 'true',
        },
        files: {
          image1: [{ path: 'path1' }],
          image2: [{ path: 'path2' }],
        },
      };
      const res = mockRes();

      cloudinary.uploader.upload
        .mockResolvedValueOnce({ secure_url: 'url1' })
        .mockResolvedValueOnce({ secure_url: 'url2' });

      productModel.prototype.save = jest.fn().mockResolvedValueOnce({});
      await addProduct(req, res);

      expect(cloudinary.uploader.upload).toHaveBeenCalledTimes(2);
      expect(productModel.prototype.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Product is added successfully' });
    });

    /**
     * Should handle errors during product addition.
    */



    it('should handle error', async () => {
      const req = { body: {}, files: {} };
      const res = mockRes();
      productModel.prototype.save = jest.fn().mockRejectedValueOnce(new Error('Save error'));
      await addProduct(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: expect.any(String) });
    });
  });

  /**
   * Testing  removeProduct function.
   */

  describe('removeProduct', () => {

  /**
    * should remove product.
   */


    it('should remove product', async () => {
      const req = { body: { id: 'abc123' } };
      const res = mockRes();
      productModel.findByIdAndDelete.mockResolvedValueOnce({});
      await removeProduct(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Product Removed' });
    });

  /**
   * should handle error during removal
   */

    it('should handle error', async () => {
      const req = { body: { id: 'abc123' } };
      const res = mockRes();
      productModel.findByIdAndDelete.mockRejectedValueOnce(new Error('Remove error'));
      await removeProduct(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Remove error' });
    });
  });

  /**
  * Testing singleProduct function.
  */
  describe('singleProduct', () => {

  /**
  * should return single product information.
  */

    it('should return single product info', async () => {
      const req = { body: { productID: 'abc123' } };
      const res = mockRes();
      productModel.findById.mockResolvedValueOnce({ name: 'Shirt' });
      await singleProduct(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: true, product: { name: 'Shirt' } });
    });

  /**
  * should handle errors
  */

    it('should handle error', async () => {
      const req = { body: { productID: 'abc123' } };
      const res = mockRes();
      productModel.findById.mockRejectedValueOnce(new Error('Find error'));
      await singleProduct(req, res);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Find error' });
    });
  });
});