const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// CREATE - Add a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ - Get all products with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments();
    
    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEARCH - Find products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.findByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEARCH - Find products by price range
router.get('/price/:min/:max', async (req, res) => {
  try {
    const minPrice = parseFloat(req.params.min);
    const maxPrice = parseFloat(req.params.max);
    const products = await Product.findByPriceRange(minPrice, maxPrice);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEARCH - Text search in name and description
router.get('/search/:query', async (req, res) => {
  try {
    const products = await Product.find({
      $text: { $search: req.params.query }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD RATING - Add a rating to a product
router.post('/:id/rating', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.ratings.push(req.body);
    await product.save();
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;