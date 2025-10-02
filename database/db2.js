const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/";
// const database = 'ecommerce';
const database = process.env.DB_NAME;
// console.log(database);
const mongoConnect = () =>{
    mongoose.connect(mongoURI+database);
    console.log(`${database} database connected`)
}


module.exports = mongoConnect;