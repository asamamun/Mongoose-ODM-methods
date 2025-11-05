const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String
  },
  ratings: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

// Virtual for average rating
productSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return sum / this.ratings.length;
});

// Instance method to check if product is in stock
productSchema.methods.isInStock = function() {
  return this.quantity > 0;
};

// Static method to find products by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ category: category });
};

// Static method to find products by price range
productSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
  return this.find({ 
    price: { $gte: minPrice, $lte: maxPrice } 
  });
};

module.exports = mongoose.model('Product', productSchema);