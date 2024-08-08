const express = require('express');
const path = require('path')
const {tryCatch, tryCatchAsync} = require('../Services/Utils/TryCathc');
const router = express.Router()
const {ValidateProducts} = require('../Services/Utils/Validator')
const sharp = require('sharp')
const multer = require('multer')
const {CreateProduct, GetProducts, GetProductById} = require('../Services/ProductsServices');
const { Authenticate } = require('../Services/AuthServices');

const s = multer.memoryStorage();
const upload = multer({
    storage: s
});

router.get('/api/products', Authenticate, tryCatch((req,res)=>{
    const products = GetProducts()
    return res.status(200).json({products})
}));

router.get('/api/products/:id', Authenticate, tryCatch((req,res)=>{
    const productId = req.params.id;
    const product = GetProductById(parseInt(productId));
    if(!product){
        return res.status(404).json({message: "Product not found"})
    }
    return res.status(200).json({product})
}));
router.post('/api/products', Authenticate, upload.fields([
    {
        name: "productImage",
        maxCount:1
    }]), 
    ValidateProducts, tryCatchAsync(async (req, res)=>{
        const file = req.files.productImage[0];
        if(!file){
            return res.status(400).json({
                message: "Image is required"
            });
        }
        const compressedImageBuffer = await sharp(file.buffer).jpeg({quality:60}).toBuffer();
        const filename = `Product_${Date.now()}${path.extname(file.originalname)}`;
        const filePath = path.join(`./public/Images/Products`,filename);
        const product = req.body;
        CreateProduct(product, `Imaes/Products/${filename}`)
        await sharp(compressedImageBuffer).toFile(filePath);
        return res.status(201).json({
            message: "Product was created successfully"
        })
}))
module.exports = router;