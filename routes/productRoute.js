const router = require('express').Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct); // Create a product
router.post('/bulk-create', productController.bulkCreateProducts); // Bulk create products
router.get('/', productController.getProducts); // Get all products
router.get('/:id', productController.getProduct); // Get a single product by ID
router.put('/:id', productController.updateProduct); // Update a product by ID
router.delete('/:id', productController.deleteProduct); // Delete a product by ID

module.exports = router;
