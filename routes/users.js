const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE - Add a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ - Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD TO WISHLIST - Add product to user's wishlist
router.post('/:id/wishlist/:productId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.addToWishlist(req.params.productId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ADD TO CART - Add product to user's cart
router.post('/:id/cart/:productId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const quantity = req.body.quantity || 1;
    await user.addToCart(req.params.productId, quantity);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// REMOVE FROM CART - Remove product from user's cart
router.delete('/:id/cart/:productId', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.removeFromCart(req.params.productId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;