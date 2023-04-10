// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      seller: req.user._id,
    });
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    console.error('Error creating product', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

module.exports = router;
