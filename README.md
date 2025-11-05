# E-commerce Mongoose Demo

This project demonstrates various Mongoose ODM methods using an e-commerce application example with Express.js.

## Project Structure

```
├── models/
│   ├── Product.js     # Product schema and model
│   ├── User.js        # User schema and model
│   └── Order.js       # Order schema and model
├── routes/
│   ├── products.js    # Product CRUD routes
│   ├── users.js       # User CRUD routes
│   └── orders.js      # Order CRUD routes
├── server.js          # Express server setup
├── demo.js            # Demonstration script
├── api_test.js        # API testing script
├── PROJECT_TOUR.js    # Guided tour of the project
├── MONGOOSE_METHODS_SHOWCASE.js # Simple showcase of all key methods
├── MONGOOSE_CHEAT_SHEET.md # Quick reference for Mongoose methods
├── MONGOOSE_GUIDE.md  # Comprehensive Mongoose methods guide
├── LEARNING_MONGOOSE.md # Learning path and exercises
├── HOW_TO_LEARN_MONGOOSE.md # Structured approach to learning
├── HOW_TO_USE_THIS_PROJECT.md # Instructions for using this project
├── LEARNING_MONGOOSE_THROUGH_EXPRESS.md # Complete guide to learning through Express.js
├── AVAILABLE_SCRIPTS.md # List of available npm scripts
├── MONGODB_COMPASS_TUTORIAL.md # Using MongoDB Compass
├── ENV_IMPLEMENTATION_SUMMARY.md # Environment variables implementation
├── PROJECT_STRUCTURE.md # Complete project structure
├── PROJECT_SUMMARY.md # Summary of all files and concepts
├── COMPLETED_PROJECT_SUMMARY.md # Final project overview
├── PROJECT_COMPLETION_SUMMARY.md # Completion verification
├── FINAL_PROJECT_SUMMARY.md # Final accomplishment summary
├── PROJECT_COMPLETION.md # Project completion status
├── ALL_FILES_CREATED.md # Complete list of all files
├── .env               # Environment variables
├── .gitignore         # Files to ignore in git
└── package.json       # Project dependencies and scripts
```

For a detailed view of the complete project structure, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## Prerequisites

- Node.js installed
- MongoDB installed and running locally, or MongoDB Atlas account
- MongoDB Compass (for visual database management)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   PORT=3000
   ```
   Adjust the `MONGODB_URI` if you're using a different MongoDB setup (e.g., MongoDB Atlas).

3. Make sure MongoDB is running on your local machine:
   ```bash
   mongod
   ```

## Running the Application

### Start the Express server:
```bash
npm start
```

### Run the demo script:
```bash
npm run demo
```

### Run API tests:
```bash
npm run test-api
```

### Run the Mongoose methods showcase:
```bash
npm run showcase
```

### Run the project tour:
```bash
npm run tour
```

### Development mode with nodemon:
```bash
npm run dev
```

For a complete list of available scripts, see [AVAILABLE_SCRIPTS.md](./AVAILABLE_SCRIPTS.md).

## API Endpoints

### Products
- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get a product by ID
- `PUT /api/products/:id` - Update a product by ID
- `DELETE /api/products/:id` - Delete a product by ID
- `GET /api/products/category/:category` - Find products by category
- `GET /api/products/price/:min/:max` - Find products by price range
- `GET /api/products/search/:query` - Search products by name/description
- `POST /api/products/:id/rating` - Add a rating to a product

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID
- `POST /api/users/:id/wishlist/:productId` - Add product to user's wishlist
- `POST /api/users/:id/cart/:productId` - Add product to user's cart
- `DELETE /api/users/:id/cart/:productId` - Remove product from user's cart

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get an order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/user/:userId` - Get orders by user ID

## Key Mongoose Concepts Demonstrated

1. **Schema Definition** - Defining document structure with validation
2. **Models** - Creating models from schemas
3. **CRUD Operations** - Create, Read, Update, Delete documents
4. **Query Methods** - Advanced querying with filters and operators
5. **Population** - Populating referenced documents
6. **Middleware** - Pre and post hooks for document lifecycle events
7. **Instance Methods** - Methods that operate on document instances
8. **Static Methods** - Methods that operate on the model itself
9. **Virtual Properties** - Computed properties that are not stored
10. **Indexes** - Database indexes for improved query performance
11. **Validation** - Built-in and custom validation rules
12. **Aggregation** - Data processing pipelines

## Learning Resources

- [Project Tour](./PROJECT_TOUR.js) - Guided tour of the project
- [Environment Variables Implementation](./ENV_IMPLEMENTATION_SUMMARY.md) - Implementation details
- [Project Completion](./PROJECT_COMPLETION.md) - Final project status
- [Learning Mongoose Through Express.js](./LEARNING_MONGOOSE_THROUGH_EXPRESS.md) - Complete learning guide
- [Available Scripts](./AVAILABLE_SCRIPTS.md) - List of all npm scripts
- [Final Project Summary](./FINAL_PROJECT_SUMMARY.md) - Summary of accomplishments
- [How to Use This Project](./HOW_TO_USE_THIS_PROJECT.md) - Instructions for effective learning
- [Project Structure](./PROJECT_STRUCTURE.md) - Complete project structure
- [Project Completion Summary](./PROJECT_COMPLETION_SUMMARY.md) - Verification of completed work
- [All Files Created](./ALL_FILES_CREATED.md) - Complete list of all files
- [Project Summary](./PROJECT_SUMMARY.md) - Complete overview of all files and concepts
- [Completed Project Summary](./COMPLETED_PROJECT_SUMMARY.md) - Final project overview
- [How to Learn Mongoose](./HOW_TO_LEARN_MONGOOSE.md) - Structured approach to learning
- [Mongoose Methods Showcase](./MONGOOSE_METHODS_SHOWCASE.js) - Simple demonstration of all key methods
- [Mongoose Cheat Sheet](./MONGOOSE_CHEAT_SHEET.md) - Quick reference for Mongoose methods
- [Mongoose Guide](./MONGOOSE_GUIDE.md) - Comprehensive guide to Mongoose methods
- [Learning Mongoose](./LEARNING_MONGOOSE.md) - Structured learning path with exercises
- [MongoDB Compass Tutorial](./MONGODB_COMPASS_TUTORIAL.md) - Using MongoDB Compass with this project
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html) - Official documentation

## Models

### Product
- name, description, price, category, quantity, etc.
- Ratings and reviews
- Tags for categorization

### User
- Personal information (name, email, address)
- Wishlist functionality
- Shopping cart
- Order history

### Order
- User reference
- Order items with product references
- Shipping address
- Payment information
- Order status tracking

## Example Usage

After starting the server, you can use tools like Postman or curl to interact with the API:

```bash
# Create a new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "description": "This is a sample product",
    "price": 29.99,
    "category": "Electronics",
    "quantity": 100
  }'

# Get all products
curl http://localhost:3000/api/products

# Search for products
curl http://localhost:3000/api/products/search/sample
```