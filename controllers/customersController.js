const Customers = require('../models/customers');
const bcrypt = require('bcryptjs');

const getAllCustomers = async (req,res) => {
    try {
        let result = await Customers.find()
        res.status(200).send(result);
    } catch(err){
        res.status(400).send({error:'Something went wrong.Please try again'});
    }
}

const addCustomers = async (req,res) => {
    try {
        let {email,password} = req.body;
        let emailExist = await Customers.findOne({'email':email});
        if(emailExist){
            return  res.status(400).send({error:"Email exists in the systme.Please try another one"});
        }
        req.body.password = await bcrypt.hash(password,10);
        req.body.status = true;
        req.body.createdAt = new Date();
        let result = await Customers.create(req.body);
        res.status(200).send(result);
    } catch(err){
        res.status(400).send({error:'Something went wrong.Please try again,Error:'+err});
    }
}

module.exports = {
    getAllCustomers,
    addCustomers
}