const Products = require('../models/product');


const getAllProducts = async(req,res) => {
    let result = await Products.find();
    res.status(200).send(result);
}

const addProduct = async(req,res) => {
    req.body.createdAt = new Date();
    let result = await Products.create(req.body);
    res.status(201).send(result);
}

const updateProduct = async(req,res) => {
    let {id }= req.params;
    console.log(id);
    let result = await Products.updateOne({_id:id},{$set:req.body});
    console.log(result);
    res.status(200).send({message:'Product updated successfully'});
}



module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
};