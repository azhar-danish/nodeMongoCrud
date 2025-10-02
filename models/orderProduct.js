const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderProductModel = new Schema({
    customer_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customers'
    },
    order_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'orders'
    },
    product_id : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'products'
    },
    product_name:{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true,
    },
    mrp : {
        type : Number,
        required : true
    },
    order_product_status : {
        type : String,
        default : null
    },
    order_product_id : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : null
    }
});

const OrderProduct = mongoose.model('order_product',OrderProductModel);
module.exports = OrderProduct;