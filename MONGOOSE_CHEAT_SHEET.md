# Mongoose Cheat Sheet

A quick reference guide for Mongoose ODM methods.

## Connection

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
```

## Schema Definition

```javascript
const schema = new mongoose.Schema({
  // Basic types
  name: String,
  age: Number,
  active: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  
  // With options
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  // References
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Nested schema
  address: {
    street: String,
    city: String
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual properties
schema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Middleware
schema.pre('save', function(next) {
  // Do something before saving
  next();
});

// Instance methods
schema.methods.customMethod = function() {
  // Custom logic
  return this.save();
};

// Static methods
schema.statics.findByCategory = function(category) {
  return this.find({ category: category });
};

// Indexes
schema.index({ name: 1 });
schema.index({ category: 1, price: -1 });
schema.index({ name: 'text', description: 'text' });
```

## Model Creation

```javascript
const Model = mongoose.model('ModelName', schema);
```

## CREATE Operations

```javascript
// Method 1: new + save
const doc = new Model({ name: 'Document' });
await doc.save();

// Method 2: create
const doc = await Model.create({ name: 'Document' });

// Method 3: insertMany
const docs = await Model.insertMany([
  { name: 'Doc 1' },
  { name: 'Doc 2' }
]);
```

## READ Operations

```javascript
// Find all
const allDocs = await Model.find();

// Find by ID
const doc = await Model.findById('id');

// Find one
const doc = await Model.findOne({ name: 'Document' });

// Find with conditions
const docs = await Model.find({ age: { $gt: 18 } });

// Find with projection
const docs = await Model.find({}, 'name age');

// Find with sorting
const docs = await Model.find().sort({ createdAt: -1 });

// Find with limit
const docs = await Model.find().limit(10);

// Find with skip (pagination)
const docs = await Model.find().skip(10).limit(10);

// Count documents
const count = await Model.countDocuments({ active: true });
```

## UPDATE Operations

```javascript
// Update one
const result = await Model.updateOne(
  { name: 'Document' },
  { $set: { active: false } }
);

// Update many
const result = await Model.updateMany(
  { category: 'Electronics' },
  { $set: { discount: 10 } }
);

// Find one and update
const doc = await Model.findOneAndUpdate(
  { name: 'Document' },
  { $set: { active: false } },
  { new: true } // Return updated document
);

// Find by ID and update
const doc = await Model.findByIdAndUpdate(
  'id',
  { $set: { active: false } },
  { new: true }
);

// Upsert (update or insert)
const doc = await Model.findOneAndUpdate(
  { name: 'Document' },
  { $set: { active: true } },
  { upsert: true, new: true }
);
```

## DELETE Operations

```javascript
// Delete one
const result = await Model.deleteOne({ name: 'Document' });

// Delete many
const result = await Model.deleteMany({ category: 'Electronics' });

// Find one and delete
const doc = await Model.findOneAndDelete({ name: 'Document' });

// Find by ID and delete
const doc = await Model.findByIdAndDelete('id');
```

## Query Methods

### Comparison Operators

```javascript
Model.find({ age: { $eq: 25 } });     // Equal
Model.find({ age: { $ne: 25 } });     // Not equal
Model.find({ age: { $gt: 18 } });     // Greater than
Model.find({ age: { $gte: 18 } });    // Greater than or equal
Model.find({ age: { $lt: 65 } });     // Less than
Model.find({ age: { $lte: 65 } });    // Less than or equal
Model.find({ role: { $in: ['admin', 'user'] } });  // In array
Model.find({ role: { $nin: ['admin'] } });         // Not in array
```

### Logical Operators

```javascript
Model.find({
  $and: [
    { age: { $gte: 18 } },
    { active: true }
  ]
});

Model.find({
  $or: [
    { role: 'admin' },
    { age: { $gte: 65 }
  ]
});

Model.find({
  $not: { active: true }
});
```

### Element Operators

```javascript
Model.find({ phone: { $exists: true } });  // Field exists
Model.find({ tags: { $size: 2 } });        // Array size
```

### Array Operators

```javascript
Model.find({ tags: 'important' });         // Contains element
Model.find({ tags: { $all: ['red', 'blue'] } });  // Contains all
Model.find({ 
  tags: { 
    $elemMatch: { 
      $eq: 'important' 
    } 
  } 
});  // Element match
```

### Evaluation Operators

```javascript
Model.find({ name: { $regex: /^J/ } });    // Regular expression
Model.find({ $text: { $search: 'JavaScript' } }); // Text search
```

## Population

```javascript
// Simple populate
const doc = await Model.findById('id').populate('user');

// Populate multiple paths
const doc = await Model.findById('id')
  .populate('user')
  .populate('category');

// Populate with select
const doc = await Model.findById('id')
  .populate('user', 'name email');

// Populate with conditions
const doc = await Model.findById('id')
  .populate({
    path: 'user',
    match: { active: true },
    select: 'name email'
  });

// Deep populate
const doc = await Model.findById('id')
  .populate({
    path: 'user',
    populate: {
      path: 'friends'
    }
  });
```

## Aggregation Pipeline

```javascript
const result = await Model.aggregate([
  // Match stage
  { $match: { active: true } },
  
  // Group stage
  { 
    $group: { 
      _id: '$category',
      count: { $sum: 1 },
      avgPrice: { $avg: '$price' }
    } 
  },
  
  // Sort stage
  { $sort: { count: -1 } },
  
  // Limit stage
  { $limit: 5 }
]);
```

## Common Patterns

### Pagination

```javascript
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const docs = await Model.find()
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

const total = await Model.countDocuments();
const totalPages = Math.ceil(total / limit);
```

### Text Search

```javascript
// In schema, add text index
schema.index({ name: 'text', description: 'text' });

// In query
const docs = await Model.find({
  $text: { $search: 'search term' }
});
```

### Error Handling

```javascript
try {
  const doc = await Model.create({ name: 'Document' });
  res.json(doc);
} catch (error) {
  if (error.name === 'ValidationError') {
    // Handle validation errors
    res.status(400).json({ message: error.message });
  } else if (error.name === 'MongoError' && error.code === 11000) {
    // Handle duplicate key errors
    res.status(400).json({ message: 'Duplicate key error' });
  } else {
    // Handle other errors
    res.status(500).json({ message: error.message });
  }
}
```

### Transactions

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  const doc1 = await Model1.create({ name: 'Doc 1' }, { session });
  const doc2 = await Model2.create({ name: 'Doc 2' }, { session });
  
  await session.commitTransaction();
  res.json({ doc1, doc2 });
} catch (error) {
  await session.abortTransaction();
  res.status(400).json({ message: error.message });
} finally {
  session.endSession();
}
```

## Best Practices

1. **Always use async/await** or promises for Mongoose operations
2. **Handle errors appropriately** with try/catch blocks
3. **Use indexes** for frequently queried fields
4. **Validate data** at the schema level
5. **Use lean()** for read-only operations to improve performance
6. **Limit query results** to prevent loading too much data
7. **Use select()** to retrieve only needed fields
8. **Use populate wisely** - only populate fields you actually need
9. **Close connections** when done in scripts
10. **Use transactions** for multi-document operations that need atomicity