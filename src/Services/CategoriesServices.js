require("dotenv").config()
const db = require('better-sqlite3')(process.env.DBNAME);

const CreateCategory = (category)=>{
    const query = "INSERT INTO Categories (description, active, created_at) VALUES (?, ?, ?)"
    const currentTime = new Date;
    const result = db.prepare(query).run(category.description, 1, currentTime.toISOString());
    if(result.changes ===0){
        throw new Error("An error occured while creating a new Category")
    }
}
const GetAllCategories = () =>{
    const query = 'SELECT Id, description FROM Categories WHERE active = 1';
    const result = db.prepare(query).all();
    return result;
}
module.exports = {CreateCategory, GetAllCategories}