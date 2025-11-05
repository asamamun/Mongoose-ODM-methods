/**
 * Mongoose Methods Showcase
 * 
 * This script demonstrates all the key Mongoose methods in a simple e-commerce context.
 * Each section shows a specific Mongoose feature with practical examples.
 */

require('dotenv').config();
const mongoose = require('mongoose');

// 1. Schema Definition
console.log('=== 1. Schema Definition ===');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0 },
  category: { type: String, enum: ['Electronics', 'Clothing', 'Books'] },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

// 2. Instance Methods
productSchema.methods.applyDiscount = function(percentage) {
  this.price = this.price * (1 - percentage / 100);
  return this.save();
};

// 3. Static Methods
productSchema.statics.findByCategory = function(category) {
  return this.find({ category: category });
};

// 4. Virtual Properties
productSchema.virtual('displayName').get(function() {
  return `${this.name} - $${this.price}`;
});

// 5. Middleware
productSchema.pre('save', function(next) {
  console.log(`Saving product: ${this.name}`);
  next();
});

// 6. Model Creation
const Product = mongoose.model('Product', productSchema);

// 7. Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB\n');
  
  try {
    // Clear existing data
    await Product.deleteMany({});
    
    console.log('=== 2. CREATE Operations ===');
    
    // Method 1: new + save
    const product1 = new Product({
      name: 'iPhone',
      price: 999,
      category: 'Electronics',
      tags: ['smartphone', 'apple']
    });
    await product1.save();
    console.log('Created product with new + save:', product1.name);
    
    // Method 2: create
    const product2 = await Product.create({
      name: 'MacBook',
      price: 1299,
      category: 'Electronics',
      tags: ['laptop', 'apple']
    });
    console.log('Created product with create():', product2.name);
    
    // Method 3: insertMany
    const products = await Product.insertMany([
      {
        name: 'T-Shirt',
        price: 19.99,
        category: 'Clothing',
        tags: ['cotton', 'casual']
      },
      {
        name: 'JavaScript Guide',
        price: 29.99,
        category: 'Books',
        tags: ['programming', 'javascript']
      }
    ]);
    console.log('Created multiple products with insertMany:', products.length, 'products\n');
    
    console.log('=== 3. READ Operations ===');
    
    // Method 1: find
    const allProducts = await Product.find();
    console.log('All products count:', allProducts.length);
    
    // Method 2: findById
    const singleProduct = await Product.findById(product1._id);
    console.log('Found product by ID:', singleProduct.name);
    
    // Method 3: findOne
    const oneProduct = await Product.findOne({ category: 'Books' });
    console.log('Found one book:', oneProduct.name);
    
    // Method 4: find with conditions
    const expensiveProducts = await Product.find({ price: { $gt: 500 } });
    console.log('Expensive products count:', expensiveProducts.length);
    
    // Method 5: find with projection
    const productNames = await Product.find({}, 'name price');
    console.log('Product names and prices:', productNames.map(p => `${p.name}: $${p.price}`));
    
    // Method 6: find with sorting
    const sortedProducts = await Product.find().sort({ price: -1 });
    console.log('Products sorted by price (desc):', sortedProducts.map(p => p.name));
    
    console.log('\n=== 4. QUERY METHODS ===');
    
    // Comparison operators
    const cheapProducts = await Product.find({ price: { $lt: 50 } });
    console.log('Cheap products (< $50):', cheapProducts.length);
    
    const electronics = await Product.find({ category: { $in: ['Electronics'] } });
    console.log('Electronics count:', electronics.length);
    
    // Logical operators
    const expensiveOrBooks = await Product.find({
      $or: [
        { price: { $gt: 1000 } },
        { category: 'Books' }
      ]
    });
    console.log('Expensive or books:', expensiveOrBooks.length);
    
    // Array operators
    const appleProducts = await Product.find({ tags: 'apple' });
    console.log('Apple products:', appleProducts.length);
    
    console.log('\n=== 5. UPDATE Operations ===');
    
    // Method 1: updateOne
    const updateResult = await Product.updateOne(
      { name: 'iPhone' },
      { $set: { price: 899 } }
    );
    console.log('Updated documents:', updateResult.modifiedCount);
    
    // Method 2: updateMany
    const updateManyResult = await Product.updateMany(
      { category: 'Electronics' },
      { $set: { category: 'Tech' } }
    );
    console.log('Updated categories for:', updateManyResult.modifiedCount, 'products');
    
    // Method 3: findOneAndUpdate
    const updatedProduct = await Product.findOneAndUpdate(
      { name: 'MacBook' },
      { $set: { price: 1199 } },
      { new: true }
    );
    console.log('Updated MacBook price:', updatedProduct.price);
    
    // Method 4: findByIdAndUpdate
    const discountedProduct = await Product.findByIdAndUpdate(
      product1._id,
      { $set: { price: 799 } },
      { new: true }
    );
    console.log('Discounted iPhone price:', discountedProduct.price);
    
    console.log('\n=== 6. DELETE Operations ===');
    
    // Method 1: deleteOne
    const deleteOneResult = await Product.deleteOne({ name: 'JavaScript Guide' });
    console.log('Deleted documents:', deleteOneResult.deletedCount);
    
    // Method 2: deleteMany
    const deleteManyResult = await Product.deleteMany({ category: 'Clothing' });
    console.log('Deleted clothing items:', deleteManyResult.deletedCount);
    
    // Method 3: findOneAndDelete
    const deletedProduct = await Product.findOneAndDelete({ name: 'MacBook' });
    console.log('Deleted product:', deletedProduct.name);
    
    console.log('\n=== 7. CUSTOM METHODS ===');
    
    // Recreate some products for demonstration
    const newProduct = await Product.create({
      name: 'iPad',
      price: 599,
      category: 'Electronics',
      tags: ['tablet', 'apple']
    });
    
    // Using instance method
    const discountedIpad = await newProduct.applyDiscount(10);
    console.log('Discounted iPad price:', discountedIpad.price);
    
    // Using static method
    const allElectronics = await Product.findByCategory('Electronics');
    console.log('Electronics products:', allElectronics.map(p => p.name));
    
    console.log('\n=== 8. VIRTUAL PROPERTIES ===');
    
    // Using virtual property
    console.log('Product display name:', newProduct.displayName);
    
    console.log('\n=== 9. AGGREGATION ===');
    
    // Aggregation pipeline example
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      },
      {
        $sort: { avgPrice: -1 }
      }
    ]);
    console.log('Category statistics:', categoryStats);
    
    console.log('\n=== 10. INDEXES ===');
    
    // Add index to schema (would normally be done in schema definition)
    // productSchema.index({ name: 1 });
    // productSchema.index({ category: 1, price: -1 });
    // productSchema.index({ name: 'text', description: 'text' });
    
    console.log('Indexes would be created with: productSchema.index()');
    
    console.log('\n=== Mongoose Methods Showcase Completed ===');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
});