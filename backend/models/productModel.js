import mongoose from "mongoose";

/**
 * Mongoose schema for a Product.
 *
 * @typedef {Object} Product
 * @property {string} name - Name of the product 
 * @property {string} description - Description of the product 
 * @property {number} price - Price of the product 
 * @property {Array<string>} image - Array of image URLs 
 * @property {string} category - Main category of the product
 * @property {string} subCategory - Sub-category of the product 
 * @property {Array<string>} sizes - Available sizes 
 * @property {boolean} [bestSeller] - Indicates if product is a best seller 
 * @property {number} date - Time of product creation 
 */

const productSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestSeller: { type: Boolean },
    date: { type: Number, required: true }

})

const productModel = mongoose.models.product || mongoose.model("Product", productSchema);

export default productModel