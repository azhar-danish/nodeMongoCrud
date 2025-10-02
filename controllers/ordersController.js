// const cache = require('../cache/redis');
const Orders = require('../models/order');
const OrderProduct = require('../models/orderProduct');

const mongoose = require("mongoose");

const getOrder = async (req,res) => {
    let {order_id} = req.params;
    
    let cacheResult = await global.cache.get('order_id:'+order_id);
    if(!cacheResult){
        let result = await Orders.aggregate([
            {
                $lookup:{
                    from : 'customers',
                    localField : 'customer_id',
                    foreignField : '_id',
                    as : 'customers'
                }
            },
            {
                $unwind : '$customers'
            },
            {
                $match : {_id:new mongoose.Types.ObjectId(order_id)}
            },
            {
                $project : {_id:0,total:1,address1:1,city:1,country:1,username:"$customers.username",mobile:"$customers.mobile"}
            }
        ]);
        if(result){
            console.log('from db');
            await global.cache.set('order_id:'+order_id,result,30);
            res.status(200).send(result);
        } else {
            res.status(400).send({error:'Order not found'});
        }
    } else {
        console.log('from cache');
        res.status(200).send(cacheResult);
    }
}
const getOrderDetails = async(req,res) => {
        let order_id = req.params.order_id;
        console.log(order_id);
        let cacheResult = await global.cache.get('orders:getOrderDetails_'+order_id);
        if(!cacheResult){
            let result  = await Orders.aggregate([
                {
                    $lookup : {
                        from : 'order_products',
                        localField : '_id',
                        foreignField : 'order_id',
                        as :'order_products'
                    }
                },
                // {
                //     $unwind : '$order_products'
                // },
                {
                    $lookup : {
                        from : 'customers',
                        localField : 'customer_id',
                        foreignField : '_id',
                        as :'customers'
                    }
                },
                {
                    $unwind : '$customers'
                },
                {
                    $match : {_id : new mongoose.Types.ObjectId(order_id)}
                }
                ,
                {
                    $project : {
                                "__v":0,
                                "customers.password":0,
                                "customers.__v":0,
                                "order_products.updatedAt":0,
                                "order_products.__v":0,
                            }
                }
            ]);
            if(result){
                console.log('from db');
                await global.cache.set('orders:getOrderDetails_'+order_id,result,30)
                res.status(200).send(result);
            } else {
                res.status(400).send({error:'Order not found'});
            }
        } else {
            console.log('from cache');
            res.status(200).send(cacheResult);
        }
        
}

const createOrder = async(req,res) => {
    try{
        let {customer_id,order_products} = req.body;
        req.body.customer_id = customer_id;
        req.body.order_status = 0;
        req.body.createdAt = new Date();
        delete req.body.order_products;

        let result = await Orders.create(req.body);
        if(result){
            let order_product_details = [];
            for(let product of order_products){
                let product_detail = {}
                product_detail.order_id = result._id;
                product_detail.customer_id = result.customer_id;
                product_detail.product_id = product.product_id;
                product_detail.product_name = product.product_name;
                product_detail.price = product.price;
                product_detail.mrp = product.mrp;
                
                let orderProduct = await OrderProduct.create(product_detail);
                order_product_details.push(orderProduct);
            }
            res.status(200).send({result,order_product_details});
        } else {
            res.status(400).send({error : 'Error in creating order'});
        }
    } catch(err){
        res.status(400).send({error : 'Error in creating order,error:'+err});
    }
}

module.exports = {
    getOrder,
    createOrder,
    getOrderDetails
}