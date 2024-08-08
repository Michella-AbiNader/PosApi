const express = require('express')
const app = express();
require('dotenv').config();
app.use(express.json());
const Categories = require('./Routes/Categories');
const errorHandler = require('./Services/Utils/ErrorHandler');
const Products = require('./Routes/Products');
const Auth = require("./Routes/Auth")

app.use(Products)
app.use(Categories);
app.use(Auth);
app.use(express.static('public'))
app.use(errorHandler);
const PORT = process.env.PORT || 3030
app.listen(3030, ()=>{
    console.log(`PORT is listening on port ${PORT}`)
});