import React from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const ProductListing = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="container my-5">
        <div className="row mb-4">
          <div className="col-md-6">
            <h1>All Products</h1>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search products..."
              />
              <select className="form-select">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Clothing</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="col">
              <ProductCard />
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductListing;