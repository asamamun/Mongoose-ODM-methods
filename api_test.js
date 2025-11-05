const axios = require('axios');

const baseURL = 'http://localhost:3000/api';

// Test the API endpoints
async function testAPI() {
  try {
    console.log('Testing E-commerce API...\n');
    
    // Create a product
    console.log('1. Creating a product...');
    const productResponse = await axios.post(`${baseURL}/products`, {
      name: 'Test Product',
      description: 'This is a test product',
      price: 29.99,
      category: 'Electronics',
      quantity: 10
    });
    const product = productResponse.data;
    console.log('Created product:', product.name, '- $' + product.price);
    
    // Get all products
    console.log('\n2. Getting all products...');
    const productsResponse = await axios.get(`${baseURL}/products`);
    console.log('Total products:', productsResponse.data.products.length);
    
    // Search for products
    console.log('\n3. Searching for "Test"...');
    const searchResponse = await axios.get(`${baseURL}/products/search/Test`);
    console.log('Search results:', searchResponse.data.length, 'products found');
    
    // Create a user
    console.log('\n4. Creating a user...');
    const userResponse = await axios.post(`${baseURL}/users`, {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        country: 'Test Country'
      }
    });
    const user = userResponse.data;
    console.log('Created user:', user.fullName);
    
    // Add product to user's wishlist
    console.log('\n5. Adding product to wishlist...');
    const wishlistResponse = await axios.post(`${baseURL}/users/${user._id}/wishlist/${product._id}`);
    console.log('Wishlist items:', wishlistResponse.data.wishlist.length);
    
    console.log('\nAll tests completed successfully!');
    
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

// Run the test
testAPI();