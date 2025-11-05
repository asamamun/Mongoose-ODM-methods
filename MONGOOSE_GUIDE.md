# Mongoose ODM Methods Guide for E-commerce Applications

This guide demonstrates various Mongoose methods using an e-commerce project example with Express.js.

## Table of Contents
1. [Setup and Connection](#setup-and-connection)
2. [Schema Definition](#schema-definition)
3. [Model Creation](#model-creation)
4. [CRUD Operations](#crud-operations)
5. [Query Methods](#query-methods)
6. [Population (Populate)](#population-populate)
7. [Middleware](#middleware)
8. [Instance Methods](#instance-methods)
9. [Static Methods](#static-methods)
10. [Virtual Properties](#virtual-properties)
11. [Indexes](#indexes)
12. [Validation](#validation)

## Setup and Connection

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
```

## Schema Definition

Schemas define the structure of documents in a collection:

```javascript
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});
```

## Model Creation

Models are constructors compiled from Schema definitions:

```javascript
const Product = mongoose.model('Product', productSchema);
```

## CRUD Operations

### Create

```javascript
// Method 1: Create instance and save
const product = new Product({
  name: 'iPhone 15',
  price: 999,
  category: 'Electronics',
  quantity: 10
});
await product.save();

// Method 2: Using create()
const product = await Product.create({
  name: 'iPhone 15',
  price: 999,
  category: 'Electronics',
  quantity: 10
});

// Method 3: Create multiple documents
const products = await Product.insertMany([
  { name: 'iPhone 15', price: 999, category: 'Electronics', quantity: 10 },
  { name: 'Samsung Galaxy S23', price: 899, category: 'Electronics', quantity: 15 }
]);
```

### Read

```javascript
// Find all documents
const allProducts = await Product.find();

// Find by ID
const product = await Product.findById('productId');

// Find one document
const product = await Product.findOne({ category: 'Electronics' });

// Find with conditions
const expensiveProducts = await Product.find({ price: { $gt: 500 } });

// Find with projection (select specific fields)
const productNames = await Product.find({}, 'name price');

// Find with limit and sort
const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(10);
```

### Update

```javascript
// Update by ID
const updatedProduct = await Product.findByIdAndUpdate(
  'productId',
  { price: 899 },
  { new: true, runValidators: true }
);

// Update one document
const result = await Product.updateOne(
  { name: 'iPhone 15' },
  { $set: { price: 899 } }
);

// Update multiple documents
const result = await Product.updateMany(
  { category: 'Electronics' },
  { $set: { discount: 10 } }
);

// Upsert (update or insert)
const product = await Product.findOneAndUpdate(
  { name: 'iPhone 15' },
  { price: 999, quantity: 10 },
  { upsert: true, new: true }
);
```

### Delete

```javascript
// Delete by ID
const deletedProduct = await Product.findByIdAndDelete('productId');

// Delete one document
const result = await Product.deleteOne({ name: 'iPhone 15' });

// Delete multiple documents
const result = await Product.deleteMany({ category: 'Electronics' });
```

## Query Methods

Mongoose provides a rich query API:

```javascript
// Comparison operators
Product.find({ price: { $gt: 500 } });        // Greater than
Product.find({ price: { $lt: 1000 } });       // Less than
Product.find({ price: { $gte: 500 } });       // Greater than or equal
Product.find({ price: { $lte: 1000 } });      // Less than or equal
Product.find({ category: { $in: ['Electronics', 'Books'] } });  // In array
Product.find({ category: { $nin: ['Electronics'] } });          // Not in array

// Logical operators
Product.find({
  $and: [
    { price: { $gt: 500 } },
    { category: 'Electronics' }
  ]
});

Product.find({
  $or: [
    { category: 'Electronics' },
    { price: { $lt: 100 } }
  ]
});

Product.find({
  $not: { category: 'Electronics' }
});

// Element operators
Product.find({ tags: { $exists: true } });     // Field exists
Product.find({ tags: { $size: 2 } });          // Array size

// Array operators
Product.find({ tags: { $all: ['sale', 'featured'] } });  // Contains all
Product.find({ tags: 'sale' });                          // Contains element
Product.find({ tags: { $elemMatch: { $eq: 'sale' } } }); // Element match

// Evaluation operators
Product.find({ name: { $regex: /^iP/i } });    // Regular expression
Product.find({ $text: { $search: 'iPhone' } }); // Text search

// Geospatial operators
// Assuming we have location data
Store.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [-73.9857, 40.7484]
      },
      $maxDistance: 1000
    }
  }
});
```

## Population (Populate)

Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s):

```javascript
// Simple population
const order = await Order.findById('orderId').populate('user');

// Populate multiple paths
const order = await Order.findById('orderId')
  .populate('user')
  .populate('items.product');

// Populate with select
const order = await Order.findById('orderId')
  .populate('user', 'firstName lastName email');

// Populate with conditions
const user = await User.findById('userId')
  .populate({
    path: 'wishlist',
    match: { inStock: true },
    select: 'name price'
  });

// Deep population
const user = await User.findById('userId')
  .populate({
    path: 'orders',
    populate: {
      path: 'items.product',
      select: 'name price'
    }
  });
```

## Middleware

Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions:

```javascript
// Pre middleware - runs before saving
userSchema.pre('save', function(next) {
  // Hash password before saving
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

// Post middleware - runs after saving
userSchema.post('save', function(doc, next) {
  console.log('User saved:', doc.email);
  next();
});

// Pre middleware for validation
productSchema.pre('validate', function(next) {
  // Set default image URL if not provided
  if (!this.imageUrl) {
    this.imageUrl = `/images/default-${this.category}.jpg`;
  }
  next();
});

// Pre middleware for remove
userSchema.pre('remove', async function(next) {
  // Remove all orders associated with this user
  await Order.deleteMany({ user: this._id });
  next();
});
```

## Instance Methods

Instance methods are functions that operate on individual documents:

```javascript
// Define instance method in schema
userSchema.methods.addToWishlist = function(productId) {
  if (!this.wishlist.includes(productId)) {
    this.wishlist.push(productId);
    return this.save();
  }
  return this;
};

// Use instance method
const user = await User.findById('userId');
await user.addToWishlist('productId');

// Another example
productSchema.methods.isInStock = function() {
  return this.quantity > 0;
};

const product = await Product.findById('productId');
if (product.isInStock()) {
  console.log('Product is available');
}
```

## Static Methods

Static methods are functions that operate on the model itself:

```javascript
// Define static method in schema
productSchema.statics.findByCategory = function(category) {
  return this.find({ category: category });
};

// Use static method
const electronics = await Product.findByCategory('Electronics');

// Another example
productSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
  return this.find({ 
    price: { $gte: minPrice, $lte: maxPrice } 
  });
};

const affordableProducts = await Product.findByPriceRange(100, 500);
```

## Virtual Properties

Virtuals are document properties that you can get and set but that do not get persisted to MongoDB:

```javascript
// Define virtual property
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

productSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return sum / this.ratings.length;
});

orderSchema.virtual('itemCount').get(function() {
  return this.items.reduce((count, item) => count + item.quantity, 0);
});

// Use virtual property
const user = await User.findById('userId');
console.log(user.fullName); // John Doe

const product = await Product.findById('productId');
console.log(product.averageRating); // 4.5
```

## Indexes

Indexes improve query performance:

```javascript
// Single field index
productSchema.index({ name: 1 });

// Compound index
productSchema.index({ category: 1, price: -1 });

// Text index for search
productSchema.index({ name: 'text', description: 'text' });

// Unique index
userSchema.index({ email: 1 }, { unique: true });

// TTL index (automatically removes documents after specified time)
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

## Validation

Mongoose provides several built-in validators and allows custom validators:

```javascript
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email format is invalid']
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot exceed 120'],
    validate: {
      validator: function(v) {
        return v >= 18; // Custom validator
      },
      message: 'User must be at least 18 years old'
    }
  }
});

// Custom validator function
userSchema.path('phoneNumber').validate({
  validator: function(v) {
    return /^\d{10}$/.test(v);
  },
  message: 'Phone number must be 10 digits'
});
```

## Advanced Features

### Aggregation Pipeline

Aggregations perform data processing operations:

```javascript
// Sales report by category
const salesReport = await Product.aggregate([
  {
    $group: {
      _id: '$category',
      totalProducts: { $sum: 1 },
      avgPrice: { $avg: '$price' },
      maxPrice: { $max: '$price' },
      minPrice: { $min: '$price' }
    }
  },
  {
    $sort: { avgPrice: -1 }
  }
]);

// Top rated products
const topRatedProducts = await Product.aggregate([
  {
    $addFields: {
      averageRating: { $avg: '$ratings.rating' }
    }
  },
  {
    $match: {
      averageRating: { $gte: 4 }
    }
  },
  {
    $sort: { averageRating: -1 }
  },
  {
    $limit: 10
  }
]);
```

### Transactions

Multi-document transactions ensure atomicity:

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Create order
  const order = new Order(orderData);
  await order.save({ session });
  
  // Update product quantities
  for (const item of order.items) {
    const product = await Product.findById(item.product).session(session);
    product.quantity -= item.quantity;
    if (product.quantity < 0) {
      throw new Error('Insufficient inventory');
    }
    await product.save({ session });
  }
  
  await session.commitTransaction();
  res.json(order);
} catch (error) {
  await session.abortTransaction();
  res.status(400).json({ message: error.message });
} finally {
  session.endSession();
}
```

## Best Practices

1. **Use indexes appropriately** - Add indexes on frequently queried fields
2. **Validate data at the schema level** - Prevent invalid data from being saved
3. **Use lean() for read-only operations** - Improves performance when you don't need Mongoose document methods
4. **Handle errors properly** - Always wrap Mongoose operations in try/catch blocks
5. **Use populate wisely** - Only populate fields you actually need
6. **Limit query results** - Use limit() to prevent loading too much data
7. **Use projections** - Select only the fields you need with select()

## Conclusion

This guide covered the essential Mongoose methods for building e-commerce applications with Express.js. By understanding these concepts and practicing with the examples, you'll be well-equipped to build robust MongoDB-powered applications.