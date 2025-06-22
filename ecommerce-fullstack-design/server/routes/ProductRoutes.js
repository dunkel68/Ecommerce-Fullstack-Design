const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/ProductController');

// GET all products
router.get('/', getAllProducts);

// GET featured products
router.get('/featured', getFeaturedProducts);

// GET single product
router.get('/:id', getProductById);

// POST create new product
router.post('/', createProduct);

// PUT update product
router.put('/:id', updateProduct);

// DELETE product
router.delete('/:id', deleteProduct);

// SEARCH products
router.get('/search', searchProducts);

module.exports = router;