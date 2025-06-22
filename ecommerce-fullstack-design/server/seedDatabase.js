const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://example.com/headphones.jpg",
    description: "High-quality wireless headphones with noise cancellation",
    category: "electronics",
    stock: 50,
    featured: true
  },
  {
    name: "Cotton T-Shirt",
    price: 19.99,
    image: "https://example.com/tshirt.jpg",
    description: "Comfortable 100% cotton t-shirt",
    category: "clothing",
    stock: 100,
    featured: true
  },
  // Add more sample products as needed
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Added sample products');
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  });