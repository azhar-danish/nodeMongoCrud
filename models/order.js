const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderModel = new Schema({
    customer_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customers'
    },
    total : {
        type : Number,
        required : true
    },
    address1 : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    postcode : {
        type : String,
        required : true
    },
    order_status : {
        type : Number,
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now()
    }
});

const Order = mongoose.model('order',OrderModel);

module.exports = Order;