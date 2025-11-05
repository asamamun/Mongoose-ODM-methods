require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    
    console.log('Creating sample products...');
    
    // Create sample products
    const products = await Product.insertMany([
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system',
        price: 999,
        category: 'Electronics',
        quantity: 50,
        tags: ['smartphone', 'apple', 'mobile']
      },
      {
        name: 'Samsung Galaxy S23',
        description: 'Android flagship smartphone',
        price: 899,
        category: 'Electronics',
        quantity: 30,
        tags: ['smartphone', 'samsung', 'android']
      },
      {
        name: 'MacBook Pro',
        description: 'Professional laptop for developers',
        price: 1999,
        category: 'Electronics',
        quantity: 20,
        tags: ['laptop', 'apple', 'computer']
      },
      {
        name: 'Nike Air Max',
        description: 'Comfortable running shoes',
        price: 120,
        category: 'Clothing',
        quantity: 100,
        tags: ['shoes', 'nike', 'sports']
      }
    ]);
    
    console.log('Created products:', products.map(p => p.name));
    
    // Create sample users
    console.log('Creating sample users...');
    const users = await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        address: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        }
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        password: 'password123',
        address: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        }
      }
    ]);
    
    console.log('Created users:', users.map(u => u.fullName));
    
    // Demonstrate various Mongoose methods
    
    // 1. Find all products
    console.log('\n--- Finding all products ---');
    const allProducts = await Product.find();
    console.log('All products count:', allProducts.length);
    
    // 2. Find products by category using static method
    console.log('\n--- Finding Electronics ---');
    const electronics = await Product.findByCategory('Electronics');
    console.log('Electronics products:', electronics.map(p => p.name));
    
    // 3. Find products by price range using static method
    console.log('\n--- Finding products between $500-$1500 ---');
    const midRangeProducts = await Product.findByPriceRange(500, 1500);
    console.log('Mid-range products:', midRangeProducts.map(p => `${p.name}: $${p.price}`));
    
    // 4. Text search
    console.log('\n--- Text search for "iPhone" ---');
    const searchResults = await Product.find({ $text: { $search: 'iPhone' } });
    console.log('Search results:', searchResults.map(p => p.name));
    
    // 5. Add rating to a product
    console.log('\n--- Adding rating to iPhone ---');
    const iphone = await Product.findOne({ name: 'iPhone 15 Pro' });
    iphone.ratings.push({
      userId: users[0]._id,
      rating: 5,
      review: 'Excellent phone!'
    });
    await iphone.save();
    console.log('Average rating for iPhone:', iphone.averageRating);
    
    // 6. Add to wishlist
    console.log('\n--- Adding product to wishlist ---');
    const user = await User.findById(users[0]._id);
    await user.addToWishlist(iphone._id);
    const updatedUser = await User.findById(users[0]._id).populate('wishlist');
    console.log('Wishlist items:', updatedUser.wishlist.map(w => w.name));
    
    // 7. Add to cart
    console.log('\n--- Adding product to cart ---');
    await user.addToCart(products[1]._id, 2);
    const userWithCart = await User.findById(users[0]._id);
    console.log('Cart items:', userWithCart.cart.map(c => ({
      product: c.product,
      quantity: c.quantity
    })));
    
    // 8. Create an order
    console.log('\n--- Creating an order ---');
    const order = new Order({
      user: user._id,
      items: [
        {
          product: products[0]._id,
          quantity: 1,
          price: products[0].price
        },
        {
          product: products[1]._id,
          quantity: 2,
          price: products[1].price
        }
      ],
      shippingAddress: user.address,
      paymentMethod: 'Credit Card'
    });
    
    await order.save();
    const populatedOrder = await Order.findById(order._id)
      .populate('user')
      .populate('items.product');
    
    console.log('Order total items:', populatedOrder.itemCount);
    console.log('Order total amount: $', populatedOrder.totalAmount);
    console.log('Order items:', populatedOrder.items.map(i => 
      `${i.product.name} x${i.quantity} = $${i.price * i.quantity}`
    ));
    
    // 9. Aggregation example
    console.log('\n--- Aggregation: Products by category ---');
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' }
        }
      }
    ]);
    console.log('Category statistics:', categoryStats);
    
    console.log('\n--- Demo completed ---');
    
  } catch (error) {
    console.error('Error in demo:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
});