const db = require('better-sqlite3')(process.env.DBNAME)
require('dotenv').config()
const CreateProduct = (product, image) =>{
    const {title, description, price, category} = product;
    const now = new Date();
    const query = `INSERT INTO Products(title, description, price, category, image, created_at) VALUES (?, ?, ?, ?, ?, ?)`
    const result = db.prepare(query).run(title, description, price, category, image, now.toISOString())
    if(result.changes ===0){
        throw new Error("An unknown error occured while created a new product")
    }
}

module.exports= {
    CreateProduct
}