import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>ShopNow</h5>
            <p>Your one-stop shop for all needs</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/products" className="text-white">Products</a></li>
              <li><a href="/cart" className="text-white">Cart</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <p>Email: contact@shopnow.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="text-center pt-3 border-top">
          <p>&copy; {new Date().getFullYear()} ShopNow</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;