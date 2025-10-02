const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/";
const database = process.env.DB_NAME;

const mongoConnect = () => {
    mongoose.connect(mongoURI+database);
    console.log('Db connected');
}

module.exports = mongoConnect;