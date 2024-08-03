const express = require('express');
const {tryCatch} = require('../Services/Utils/TryCathc');
const router = express.Router()
const {CreateCategory, GetAllCategories} = require("../Services/CategoriesServices")

router.post('/api/categories', tryCatch((req, res)=>{
    const body = req.body;
    CreateCategory(body);
    return res.status(200).json({
        message: "Category was created successfully!"
    });
}));

router.get('/api/categories', tryCatch((req, res)=>{
    const categories = GetAllCategories();
    return res.status(200).json({
        categories: categories
    })
}))


module.exports = router;