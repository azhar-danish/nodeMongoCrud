const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductModel = new Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    mrp : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    is_published : {
        type : Boolean,
        default : 0
    },
    createdAt : {
        type : Date,
        required : true
    }
});
const Products = mongoose.model('products',ProductModel);

module.exports = Products;