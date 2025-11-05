const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phoneNumber: {
    type: String,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  cart: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },  // Include virtuals when document is converted to JSON
  toObject: { virtuals: true } // Include virtuals when document is converted to object
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Instance method to add product to wishlist
userSchema.methods.addToWishlist = function(productId) {
  if (!this.wishlist.includes(productId)) {
    this.wishlist.push(productId);
    return this.save();
  }
  return this;
};

// Instance method to add product to cart
userSchema.methods.addToCart = function(productId, quantity = 1) {
  const existingItem = this.cart.find(item => item.product.equals(productId));
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.cart.push({ product: productId, quantity });
  }
  return this.save();
};

// Instance method to remove product from cart
userSchema.methods.removeFromCart = function(productId) {
  this.cart = this.cart.filter(item => !item.product.equals(productId));
  return this.save();
};

module.exports = mongoose.model('User', userSchema);