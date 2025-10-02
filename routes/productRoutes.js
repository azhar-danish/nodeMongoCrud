const router = require('express').Router();

const ProductController = require('../controllers/productsController');

router.get('/',ProductController.getAllProducts);
router.post('/',ProductController.addProduct);
router.put('/update/:id',ProductController.updateProduct);


module.exports = router;