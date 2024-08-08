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

const GetProducts =() =>{
    const query = "SELECT p.id, title, p.description, price, c.description AS category, image FROM Products p JOIN Categories c ON p.category = c.id"
    const rows = db.prepare(query).all()
    return rows;
}
const GetProductById =(id) =>{
    const products = GetProducts()
    const product = products.filter((product)=>product.id ===id);
    if(product.length ===0){
        return null;
    }
    else{
        return product[0];
    }
}

module.exports= {
    CreateProduct, GetProducts, GetProductById
}