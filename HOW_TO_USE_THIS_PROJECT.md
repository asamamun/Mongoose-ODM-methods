# How to Use This Project for Learning Mongoose

This document provides step-by-step instructions on how to effectively use this Mongoose E-commerce project for learning all Mongoose ODM methods.

## Getting Started

### Prerequisites
Before using this project, ensure you have:
1. Node.js installed (version 12 or higher)
2. MongoDB installed and running locally, or access to MongoDB Atlas
3. MongoDB Compass installed (optional but recommended)
4. Basic knowledge of JavaScript and Express.js

### Installation Steps

1. **Clone or download the project**
   ```
   git clone <repository-url>
   ```
   Or download the ZIP file and extract it.

2. **Navigate to the project directory**
   ```
   cd mongoose-ecommerce-project
   ```

3. **Install dependencies**
   ```
   npm install
   ```

4. **Create a .env file**
   Create a `.env` file in the root directory with the following content:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   PORT=3000
   ```
   Adjust the `MONGODB_URI` if you're using a different MongoDB setup (e.g., MongoDB Atlas).

5. **Start MongoDB**
   Make sure MongoDB is running on your local machine:
   ```
   mongod
   ```
   Or ensure your MongoDB Atlas connection is configured in the .env file.

## Learning Path

### Phase 1: Understanding the Project Structure

1. **Read the README.md**
   Start with the main [README.md](./README.md) to understand the project overview.

2. **Take the Project Tour**
   Run the project tour to get a guided overview:
   ```
   npm run tour
   ```

3. **Review Project Structure**
   Examine [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) to understand how files are organized.

### Phase 2: Core Concepts

1. **Study the Models**
   - Review [models/Product.js](./models/Product.js)
   - Review [models/User.js](./models/User.js)
   - Review [models/Order.js](./models/Order.js)

2. **Understand the Routes**
   - Review [routes/products.js](./routes/products.js)
   - Review [routes/users.js](./routes/users.js)
   - Review [routes/orders.js](./routes/orders.js)

3. **Examine the Main Server**
   - Review [server.js](./server.js)

### Phase 3: Hands-On Practice

1. **Run the Demo Script**
   Execute the comprehensive demo to see all methods in action:
   ```
   npm run demo
   ```

2. **Test the API**
   Run the API testing script:
   ```
   npm run test-api
   ```

3. **Run the Methods Showcase**
   See a simplified demonstration of all key methods:
   ```
   npm run showcase
   ```

### Phase 4: Deep Dive into Documentation

1. **Read the Mongoose Cheat Sheet**
   Start with [MONGOOSE_CHEAT_SHEET.md](./MONGOOSE_CHEAT_SHEET.md) for quick reference.

2. **Study the Comprehensive Guide**
   Read [MONGOOSE_GUIDE.md](./MONGOOSE_GUIDE.md) for detailed explanations.

3. **Follow the Learning Path**
   Use [LEARNING_MONGOOSE.md](./LEARNING_MONGOOSE.md) for structured learning.

4. **Apply the How-to Guide**
   Follow [HOW_TO_LEARN_MONGOOSE.md](./HOW_TO_LEARN_MONGOOSE.md) for step-by-step learning.

### Phase 5: Practical Application

1. **Use MongoDB Compass**
   Follow [MONGODB_COMPASS_TUTORIAL.md](./MONGODB_COMPASS_TUTORIAL.md) to visualize your data.

2. **Modify the Code**
   Try extending the models with new features:
   - Add new fields to schemas
   - Implement new instance or static methods
   - Create new API endpoints

3. **Create Your Own Examples**
   Build additional functionality:
   - Implement user authentication
   - Add product categories
   - Create reporting features

## Weekly Learning Plan

### Week 1: Schema Design and Basic Operations
- Goals: Understand schema definition, basic CRUD operations
- Activities:
  1. Read schema sections in documentation
  2. Run demo script and focus on CREATE/READ operations
  3. Modify models to add new fields
  4. Test with MongoDB Compass

### Week 2: Query Methods and Relationships
- Goals: Master advanced queries, understand relationships
- Activities:
  1. Study query methods in the guide
  2. Practice with routes files
  3. Run showcase script focusing on queries
  4. Use MongoDB Compass for query practice

### Week 3: Custom Methods and Middleware
- Goals: Implement custom methods, use middleware
- Activities:
  1. Study methods sections in documentation
  2. Add new methods to existing models
  3. Implement middleware functions
  4. Test with demo script

### Week 4: Advanced Features
- Goals: Use aggregation, optimize performance
- Activities:
  1. Study aggregation examples
  2. Implement new aggregation pipelines
  3. Add indexes for optimization
  4. Run performance tests

## Practical Exercises

### Exercise 1: Extend Product Model
1. Add a discount field with validation
2. Create a method to apply discounts
3. Add a virtual property for discounted price
4. Implement a static method to find discounted products

### Exercise 2: Implement Shopping Cart Operations
1. Add method to update item quantities
2. Implement cart total calculation
3. Create method to clear cart
4. Add validation for stock availability

### Exercise 3: Order Status Management
1. Add timestamps for status changes
2. Implement status transition validation
3. Create methods for each status change
4. Add notifications for status updates

### Exercise 4: User Authentication
1. Add password hashing middleware
2. Create authentication methods
3. Implement session management
4. Add role-based access control

## Using MongoDB Compass for Learning

1. **Connect to Your Database**
   - Open MongoDB Compass
   - Connect to the URI specified in your `.env` file
   - Select the `ecommerce` database

2. **Explore Collections**
   - View products, users, and orders collections
   - Examine document structure
   - Check relationships between documents

3. **Practice Queries**
   - Use the filter bar to practice queries
   - Try different operators
   - Test array queries

4. **Use Aggregation Builder**
   - Practice with aggregation pipeline
   - Compare results with Mongoose aggregations
   - Build complex data analysis pipelines

## API Testing

### Manual Testing with curl
```
# Create a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":29.99,"category":"Electronics","quantity":10}'

# Get all products
curl http://localhost:3000/api/products

# Update a product
curl -X PUT http://localhost:3000/api/products/[PRODUCT_ID] \
  -H "Content-Type: application/json" \
  -d '{"price":19.99}'
```

### Automated Testing
```
npm run test-api
```

## Troubleshooting Common Issues

### Connection Problems
1. Ensure MongoDB is running
2. Check connection string in `.env` file
3. Verify firewall settings
4. Test with MongoDB Compass

### Data Not Appearing
1. Run demo script to populate data
2. Check database name in connection string
3. Verify Mongoose connection
4. Use MongoDB Compass to verify data exists

### Performance Issues
1. Check indexes on frequently queried fields
2. Use explain plan in MongoDB Compass
3. Consider adding more specific indexes
4. Review query complexity

## Next Steps

### Advanced Learning
1. Study performance optimization techniques
2. Learn security best practices
3. Explore testing strategies
4. Understand deployment considerations

### Building Your Own Projects
1. Create a blog with Mongoose
2. Build a social media app
3. Develop a task management system
4. Implement any data-driven application

## Conclusion

This project provides a comprehensive learning experience for Mongoose ODM methods. By following the structured approach outlined in this document, you'll gain practical experience with all major Mongoose features while working with a realistic e-commerce application.

Remember to:
1. Start with the basics and progress gradually
2. Practice regularly with the demo scripts
3. Use MongoDB Compass to visualize your data
4. Experiment with your own modifications
5. Refer to the comprehensive guides when needed

Happy learning!