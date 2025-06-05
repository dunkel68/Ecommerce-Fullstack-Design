import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = () => {
  const staticProduct = {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
    description: 'High-quality wireless headphones'
  };

  return (
    <div className="card h-100">
      <img 
        src={staticProduct.image} 
        className="card-img-top p-3" 
        alt={staticProduct.name} 
      />
      <div className="card-body">
        <h5 className="card-title">{staticProduct.name}</h5>
        <p className="card-text text-danger fw-bold">
          ${staticProduct.price.toFixed(2)}
        </p>
        <p className="card-text">{staticProduct.description}</p>
        <div className="d-flex justify-content-between">
          <Link 
            to={`/products/${staticProduct.id}`} 
            className="btn btn-outline-primary"
          >
            Details
          </Link>
          <button className="btn btn-success">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;