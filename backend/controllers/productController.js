import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"


// Funtion for add products
const addProduct = async (req, res) => {

    try {

        const trimmedBody = {};
        for (const key in req.body) {
            trimmedBody[key.trim()] = req.body[key];
        }

        const { name, description, price, category, subCategory, sizes, bestSeller } = trimmedBody;

        //const { name, description, price, category, subCategory, sizes, bestSeller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesurl = await Promise.all(

            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })


        )


        //console.log(name, description, price, category, subCategory, sizes, bestseller)
        //console.log(imagesurl)


        //coneection to MongoDB

        const productData = {

            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller == "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesurl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product is added successfully" })
        // res.json({})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Function for list products 
const listProducts = async (req, res) => {

    try {

        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Function for removing products 
const removeProduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }
}


// Function for single product info 
const singleProduct = async (req, res) => {

    try {

        const { productID } = req.body
        const product = await productModel.findById(productID)
        res.json({ success: true, product })

    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })

    }


}

export { listProducts, addProduct, removeProduct, singleProduct }