const router = require('express').Router();
const OrderController = require('../controllers/ordersController');

router.get('/:order_id',OrderController.getOrder);
router.get('/getOrderDetails/:order_id',OrderController.getOrderDetails);
router.post('/',OrderController.createOrder);

module.exports = router;