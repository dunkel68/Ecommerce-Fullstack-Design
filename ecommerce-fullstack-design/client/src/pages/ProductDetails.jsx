import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tab, Tabs, Image, Badge, ListGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles//ProductDetails.css';

const ProductDetails = () => {
  const [key, setKey] = useState('description');
  
  // Sample product data
  const product = {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    discount: 25,
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    stock: 15,
    images: [
      'https://via.placeholder.com/500x500?text=Headphones+1',
      'https://via.placeholder.com/500x500?text=Headphones+2',
      'https://via.placeholder.com/500x500?text=Headphones+3',
      'https://via.placeholder.com/500x500?text=Headphones+4'
    ],
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Foldable design'
    ],
    seller: {
      name: 'TechGadgets Inc.',
      rating: 4.8,
      joined: 'Jan 2020',
      products: 142,
      responseRate: '98%',
      responseTime: 'within 24 hours'
    }
  };

  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <Container className="my-5">
      {/* Navigation Breadcrumbs */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Electronics</a></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <Row>
        {/* Left Section - Product Details (2/3 width) */}
        <Col lg={8}>
          <Row className="mb-4">
            {/* Product Images (1/2 left) */}
            <Col md={6}>
              <div className="mb-3">
                <Image src={product.images[0]} fluid className="main-product-img rounded" />
              </div>
              <Row className="g-2">
                {product.images.slice(0, 3).map((img, index) => (
                  <Col xs={4} key={index}>
                    <Image src={img} fluid className="thumbnail-img rounded" />
                  </Col>
                ))}
                <Col xs={4}>
                  <div className="thumbnail-more rounded d-flex align-items-center justify-content-center">
                    +{product.images.length - 3} more
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Product Info (1/2 right) */}
            <Col md={6}>
              <h2>{product.name}</h2>
              <div className="d-flex align-items-center mb-3">
                <div className="rating-stars me-2">
                  {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="text-muted">({product.reviews} reviews)</span>
              </div>
              
              <div className="mb-3">
                {product.discount > 0 && (
                  <span className="text-decoration-line-through text-muted me-2">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <span className="h4 text-primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <Badge bg="danger" className="ms-2">{product.discount}% OFF</Badge>
                )}
              </div>

              <div className="mb-3">
                <span className={product.stock > 0 ? "text-success" : "text-danger"}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                </span>
              </div>

              <ListGroup variant="flush" className="mb-4">
                {product.features.map((feature, index) => (
                  <ListGroup.Item key={index} className="px-0">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    {feature}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex mb-4">
                <Form.Control 
                  type="number" 
                  min="1" 
                  max={product.stock} 
                  defaultValue="1" 
                  style={{ width: '80px', marginRight: '10px' }} 
                />
                <Button variant="primary" className="me-2">
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </Button>
                <Button variant="outline-primary">
                  <i className="bi bi-heart"></i> Wishlist
                </Button>
              </div>
            </Col>
          </Row>

          {/* Product Tabs */}
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="description" title="Description">
              <Card className="border-top-0 rounded-top-0">
                <Card.Body>
                  <h5>Product Description</h5>
                  <p>{product.description}</p>
                  <h5 className="mt-4">Technical Specifications</h5>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Brand</td>
                        <td>AudioMaster</td>
                      </tr>
                      <tr>
                        <td>Model</td>
                        <td>AM-WH450</td>
                      </tr>
                      <tr>
                        <td>Battery Life</td>
                        <td>30 hours</td>
                      </tr>
                      <tr>
                        <td>Bluetooth Version</td>
                        <td>5.0</td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="reviews" title="Reviews">
              <Card className="border-top-0 rounded-top-0">
                <Card.Body>
                  <h5>Customer Reviews</h5>
                  <p>No reviews yet. Be the first to review this product!</p>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="shipping" title="Shipping">
              <Card className="border-top-0 rounded-top-0">
                <Card.Body>
                  <h5>Shipping Information</h5>
                  <p>Free shipping on all orders over $50. Standard delivery takes 3-5 business days.</p>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="seller" title="About Seller">
              <Card className="border-top-0 rounded-top-0">
                <Card.Body>
                  <h5>About the Seller</h5>
                  <p>Detailed seller information would appear here.</p>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>

        {/* Right Section - Seller Info (1/3 width) */}
        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="border-bottom pb-3">Seller Information</Card.Title>
              <div className="text-center mb-3">
                <Image 
                  src="https://via.placeholder.com/100?text=Seller" 
                  roundedCircle 
                  className="mb-2"
                  width={80}
                  height={80}
                />
                <h5>{product.seller.name}</h5>
                <div className="d-flex justify-content-center mb-2">
                  <span className="text-warning me-1">★★★★★</span>
                  <span>({product.seller.rating})</span>
                </div>
                <p className="text-muted small">Member since {product.seller.joined}</p>
              </div>
              
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="d-flex justify-content-between px-0">
                  <span>Products:</span>
                  <span>{product.seller.products}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between px-0">
                  <span>Response Rate:</span>
                  <span>{product.seller.responseRate}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between px-0">
                  <span>Response Time:</span>
                  <span>{product.seller.responseTime}</span>
                </ListGroup.Item>
              </ListGroup>
              
              <div className="d-grid gap-2">
                <Button variant="primary">
                  <i className="bi bi-envelope me-2"></i> Send Inquiry
                </Button>
                <Button variant="outline-primary">
                  <i className="bi bi-person me-2"></i> View Seller Profile
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Related Products Card */}
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="border-bottom pb-3">Secure Payment</Card.Title>
              <div className="text-center py-3">
                <Image src="https://via.placeholder.com/250x100?text=Payment+Methods" fluid />
              </div>
              <p className="small text-muted">
                <i className="bi bi-shield-lock me-2"></i>
                Your payment information is processed securely.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;