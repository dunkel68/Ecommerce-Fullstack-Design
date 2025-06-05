import React from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="bg-primary text-white py-5 text-center">
        <h1 className="display-4">Welcome to ShopNow</h1>
        <p className="lead">Discover amazing products at great prices</p>
      </div>
      
      <div className="container my-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div className="col">
            <ProductCard />
          </div>
          <div className="col">
            <ProductCard />
          </div>
          <div className="col">
            <ProductCard />
          </div>
          <div className="col">
            <ProductCard />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;