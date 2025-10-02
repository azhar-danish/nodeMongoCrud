const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customersController');

router.get('/getAllCustomers',CustomersController.getAllCustomers);
router.post('/addCustomers',CustomersController.addCustomers);

module.exports = router;