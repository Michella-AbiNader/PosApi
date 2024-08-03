const express = require('express');
const path = require('path')
const {tryCatch, tryCatchAsync} = require('../Services/Utils/TryCathc');
const router = express.Router()
const {ValidateProducts} = require('../Services/Utils/Validator')
const sharp = require('sharp')
const multer = require('multer')
const {CreateProduct} = require('../Services/ProductsServices')

const s = multer.memoryStorage();
const upload = multer({
    storage: s
});

router.post('/api/products', upload.fields([
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