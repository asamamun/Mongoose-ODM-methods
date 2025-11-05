# Available Scripts

This document lists all the npm scripts available in this project and what they do.

## Main Scripts

### `npm start`
Starts the Express.js server in production mode.

**Usage:**
```bash
npm start
```

**What it does:**
- Starts the Express.js server on port 3000 (or PORT environment variable)
- Connects to MongoDB
- Loads all API routes
- Keeps the server running to handle requests

**When to use:**
- When you want to run the API server
- For testing API endpoints
- For production deployment

### `npm run dev`
Starts the Express.js server in development mode with nodemon.

**Usage:**
```bash
npm run dev
```

**What it does:**
- Starts the Express.js server with nodemon
- Automatically restarts the server when code changes are detected
- Connects to MongoDB
- Loads all API routes

**When to use:**
- During development when you're making code changes
- When you want automatic server restarts on file changes

### `npm run demo`
Runs the comprehensive demonstration script.

**Usage:**
```bash
npm run demo
```

**What it does:**
- Connects to MongoDB
- Creates sample data (products, users, orders)
- Demonstrates various Mongoose methods
- Shows static methods, instance methods, and virtual properties
- Uses aggregation pipelines
- Cleans up data at the end

**When to use:**
- To see all Mongoose methods in action
- To understand how different features work
- For learning and testing purposes

### `npm run test-api`
Runs the API testing script.

**Usage:**
```bash
npm run test-api
```

**What it does:**
- Makes HTTP requests to the API endpoints
- Tests product and user creation
- Tests wishlist functionality
- Verifies API responses

**When to use:**
- To verify that API endpoints are working
- To see examples of how to make requests to the API
- For automated testing

### `npm run showcase`
Runs the simplified Mongoose methods showcase.

**Usage:**
```bash
npm run showcase
```

**What it does:**
- Demonstrates all key Mongoose methods in a simple format
- Shows CREATE, READ, UPDATE, DELETE operations
- Demonstrates query methods
- Shows custom methods and virtual properties
- Uses aggregation pipelines

**When to use:**
- For a quick overview of all Mongoose methods
- When you want clear, simple examples
- For learning and reference

### `npm run tour`
Runs the guided project tour.

**Usage:**
```bash
npm run tour
```

**What it does:**
- Provides a guided tour of the entire project
- Explains the project structure
- Describes core models and API endpoints
- Lists demonstration scripts and learning resources
- Shows key Mongoose concepts covered

**When to use:**
- When you first start with the project
- To get an overview of what's included
- To understand how to use the project for learning

## Testing Individual Components

### Testing with curl
You can test individual API endpoints with curl:

**Get all products:**
```bash
curl http://localhost:3000/api/products
```

**Create a product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":29.99,"category":"Electronics","quantity":10}'
```

**Get a specific product:**
```bash
curl http://localhost:3000/api/products/[PRODUCT_ID]
```

**Update a product:**
```bash
curl -X PUT http://localhost:3000/api/products/[PRODUCT_ID] \
  -H "Content-Type: application/json" \
  -d '{"price":19.99}'
```

**Delete a product:**
```bash
curl -X DELETE http://localhost:3000/api/products/[PRODUCT_ID]
```

## Learning Path Recommendations

### For Beginners
1. Run `npm run tour` to get an overview
2. Run `npm run showcase` for a simple demonstration
3. Read [MONGOOSE_CHEAT_SHEET.md](./MONGOOSE_CHEAT_SHEET.md) for quick reference
4. Start the server with `npm start` and test with curl

### For Intermediate Learners
1. Run `npm run demo` to see comprehensive examples
2. Read [MONGOOSE_GUIDE.md](./MONGOOSE_GUIDE.md) for detailed explanations
3. Run `npm run test-api` to see API usage examples
4. Modify the code and test your changes

### For Advanced Learners
1. Follow [HOW_TO_LEARN_MONGOOSE.md](./HOW_TO_LEARN_MONGOOSE.md) for structured learning
2. Extend the models with new features
3. Implement additional API endpoints
4. Use MongoDB Compass for data exploration

## Troubleshooting

### If scripts don't work:
1. Ensure all dependencies are installed: `npm install`
2. Make sure MongoDB is running locally
3. Check that the server is not already running on port 3000
4. Verify Node.js is installed: `node --version`

### If API tests fail:
1. Ensure the server is running: `npm start`
2. Check that MongoDB is accessible
3. Verify the connection string in [server.js](./server.js)
4. Check the terminal output for error messages

### If demo scripts fail:
1. Ensure MongoDB is running
2. Check that no other processes are using the database
3. Verify the MongoDB connection in the script
4. Check the terminal output for specific error messages

## Best Practices

1. **Use `npm run dev` during development** for automatic restarts
2. **Run `npm run demo` before making changes** to understand the baseline behavior
3. **Test API endpoints with curl** to verify functionality
4. **Use `npm run showcase` for quick reference** on method usage
5. **Run `npm run tour` periodically** to refresh your understanding of the project structure

This project provides multiple ways to explore and learn Mongoose ODM methods, from simple demonstrations to comprehensive examples.