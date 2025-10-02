const mongoose = require('mongoose');
const {Schema} = mongoose;

const CustomersModel = new Schema({
    username:{
        type : String,
        required : true,
    },
    mobile:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    password:{
        type : String,
        required : true,
    },
    status:{
        type : Boolean,
        required : true,
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    updatedAt:{
        type : Date,
        required : false,
    },
});
const Customers = mongoose.model('customers',CustomersModel);

module.exports = Customers;