# Using MongoDB Compass with the E-commerce Project

This tutorial shows how to use MongoDB Compass to explore and interact with the data in our e-commerce project.

## Connecting to MongoDB

1. Open MongoDB Compass
2. In the connection dialog, enter the connection string from your `.env` file:
   ```
   mongodb://localhost:27017
   ```
   If you're using MongoDB Atlas, use the connection string from your Atlas dashboard.
3. Click "Connect"

## Exploring the Database

### 1. Viewing Collections

After connecting, you'll see the `ecommerce` database (created by our demo script). Click on it to see the collections:
- `products`
- `users`
- `orders`

### 2. Viewing Documents

Click on any collection to view its documents. You can:
- See the document structure
- View individual field values
- Check timestamps and references

### 3. Filtering Documents

Use the filter bar to search for specific documents:

**Examples:**
- Find products by category:
  ```json
  { "category": "Electronics" }
  ```

- Find expensive products:
  ```json
  { "price": { "$gt": 500 } }
  ```

- Find users by email:
  ```json
  { "email": "john@example.com" }
  ```

- Find orders by status:
  ```json
  { "status": "Pending" }
  ```

## Schema Analysis

Compass automatically analyzes your document schema and shows:
- Field types
- Frequency of field usage
- Sample values

This is helpful for understanding how your Mongoose schemas translate to actual MongoDB documents.

## Querying Data

### 1. Simple Queries

Use the filter bar to run simple queries:
- `{ "category": "Electronics" }` - Find all electronics
- `{ "price": { "$lt": 100 } }` - Find cheap products
- `{ "quantity": { "$gt": 0 } }` - Find in-stock products

### 2. Complex Queries

You can also run more complex queries:
- Products in price range:
  ```json
  { "price": { "$gte": 100, "$lte": 1000 } }
  ```

- Products with specific tags:
  ```json
  { "tags": { "$in": ["smartphone", "apple"] } }
  ```

## Aggregation Pipeline

Compass has a visual aggregation pipeline builder:

### 1. Group Products by Category
1. Click on the "Aggregations" tab in the products collection
2. Add a `$group` stage:
   ```json
   {
     "_id": "$category",
     "count": { "$sum": 1 },
     "avgPrice": { "$avg": "$price" }
   }
   ```

### 2. Sort by Price
Add a `$sort` stage:
```json
{ "price": -1 }
```

## Working with References

### 1. Viewing Populated Data

When viewing orders, you'll see ObjectId references to users and products. To see the actual referenced data:

1. In the orders collection, click on an order document
2. Find the `user` field (ObjectId)
3. Click the "View" link next to the ObjectId to navigate to the user document

### 2. Using Lookup (Populate)

You can simulate Mongoose populate using Compass's aggregation pipeline:

1. Go to the Aggregations tab in the orders collection
2. Add a `$lookup` stage:
   ```json
   {
     "from": "users",
     "localField": "user",
     "foreignField": "_id",
     "as": "userDetails"
   }
   ```

3. Add another `$lookup` for products:
   ```json
   {
     "from": "products",
     "localField": "items.product",
     "foreignField": "_id",
     "as": "productDetails"
   }
   ```

## Indexes

### 1. Viewing Indexes

Click on the "Indexes" tab to see existing indexes:
- `_id` (default)
- Text indexes for search
- Field indexes for performance

### 2. Creating Indexes

You can create new indexes directly in Compass:
1. Click "Create Index"
2. Specify the field(s) and index type
3. Set index options

## Validation Rules

Compass can show schema validation rules if you've defined them in MongoDB:
- View existing validation rules
- Create new validation rules
- Test validation with sample documents

## Practical Exercises

### Exercise 1: Explore Product Data
1. Connect to the database
2. View the products collection
3. Filter for products in the "Electronics" category
4. Sort by price (ascending)
5. Check the schema analysis tab

### Exercise 2: Analyze User Data
1. View the users collection
2. Find users with items in their wishlist
3. Check how the wishlist array is structured
4. Look at the virtual properties in the schema analysis

### Exercise 3: Order Analysis
1. View the orders collection
2. Filter for "Pending" orders
3. Use aggregation to group orders by status
4. Calculate the average order total

### Exercise 4: Text Search
1. Use the search bar to find products containing "iPhone"
2. Try different search terms
3. Check how the text index works

## Tips for Effective Use

1. **Use Filters Regularly** - They help you quickly find specific documents
2. **Check Schema Analysis** - It provides insights into your data structure
3. **Experiment with Aggregations** - They're powerful for data analysis
4. **Validate Your Mongoose Queries** - Use Compass to verify your queries work as expected
5. **Monitor Index Usage** - Ensure your indexes are being used effectively

## Connecting to MongoDB Atlas

If you're using MongoDB Atlas instead of a local database:

1. Get your connection string from Atlas dashboard
2. Replace the localhost connection with your Atlas connection string in the `.env` file
3. Ensure your IP is whitelisted in Atlas
4. Use your Atlas username and password

Example Atlas connection string in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/ecommerce
```

## Troubleshooting

### Connection Issues
- Ensure MongoDB is running locally (`mongod`)
- Check that the port (27017) is correct
- Verify firewall settings if using remote MongoDB
- Check the connection string in your `.env` file

### Data Not Showing
- Run the demo script to populate data: `npm run demo`
- Check that you're looking at the correct database (`ecommerce`)
- Verify your Mongoose connection is working

### Performance Issues
- Check that appropriate indexes exist
- Use the explain plan feature to analyze query performance
- Consider adding more specific indexes for your query patterns

By using MongoDB Compass alongside your Express.js and Mongoose application, you can gain deeper insights into how your data is structured and validated, which will help you write more effective Mongoose queries and understand how your application interacts with the database.