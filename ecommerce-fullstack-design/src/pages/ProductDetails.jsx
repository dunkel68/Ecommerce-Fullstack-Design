import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  
  // Static product data (will be dynamic in Week 2)
  const product = {
    id: id || 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    images: [
      'https://via.placeholder.com/500',
      'https://via.placeholder.com/500?text=Back+View',
      'https://via.placeholder.com/500?text=Side+View'
    ],
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone'
    ],
    category: 'Electronics',
    stock: 10,
    rating: 4.5,
    reviews: 128
  };

  const [quantity, setQuantity] = React.useState(1);
  const [mainImage, setMainImage] = React.useState(product.images[0]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="container my-5">
        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="mb-4 border rounded-3 overflow-hidden">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="img-fluid w-100" 
                style={{ maxHeight: '500px', objectFit: 'contain' }}
              />
            </div>
            <div className="d-flex gap-2">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  className="btn btn-outline-secondary p-0 border rounded-2"
                  onClick={() => setMainImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="col-lg-6">
            <h1 className="mb-3">{product.name}</h1>
            
            <div className="d-flex align-items-center mb-3">
              <div className="text-warning me-2">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star-half'}`}
                  ></i>
                ))}
              </div>
              <span className="text-muted">({product.reviews} reviews)</span>
            </div>
            
            <h2 className="text-danger mb-3">${product.price.toFixed(2)}</h2>
            
            <div className="mb-4">
              <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="badge bg-info ms-2">{product.category}</span>
            </div>
            
            <p className="mb-4">{product.description}</p>
            
            <h5>Features:</h5>
            <ul className="mb-4">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            
            <div className="d-flex align-items-center mb-4">
              <div className="input-group me-3" style={{ width: '120px' }}>
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input 
                  type="text" 
                  className="form-control text-center" 
                  value={quantity} 
                  readOnly 
                />
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <button 
                className="btn btn-primary me-2"
                disabled={product.stock <= 0}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Add to Cart
              </button>
              
              <button className="btn btn-outline-secondary">
                <i className="bi bi-heart"></i>
              </button>
            </div>
            
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">
                  <i className="bi bi-truck me-2"></i>
                  Free Delivery
                </h6>
                <p className="card-text small text-muted">
                  Estimated delivery in 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="row mt-5">
          <div className="col-12">
            <h3>Customer Reviews</h3>
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">Excellent Product</h5>
                  <div className="text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">By John D. - Verified Buyer</h6>
                <p className="card-text">The sound quality is amazing and the noise cancellation works perfectly on my commute.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;