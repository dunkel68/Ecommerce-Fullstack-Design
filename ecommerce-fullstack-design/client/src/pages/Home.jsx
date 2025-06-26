import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Form, Button, Card, Badge, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../components/Navbar';
import '../styles/Home.css';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products/featured');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="home-page">
        <CustomNavbar />
        <Container className="my-4 text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="home-page">
      <CustomNavbar />

      {/* Main Content */}
      <Container className="my-4">
        {/* Categories Section */}
        <Row className="mb-4">
          <Col md={3} className="bg-primary p-3 rounded">
            <h5 className="text-white">All category</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Hot offers</a></li>
              <li><a href="#" className="text-white">Gift boxes</a></li>
              <li><a href="#" className="text-white">Projects</a></li>
              <li><Link to="/Cart" className="text-white text-decoration-none">Cart</Link></li>
              <li><a href="#" className="text-white">Help</a></li>
            </ul>
            <hr className="bg-white" />
            <h5 className="text-white">Automobiles</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Clothes and wear</a></li>
              <li><a href="#" className="text-white">Home interiors</a></li>
              <li><a href="#" className="text-white">Computer and tech</a></li>
              <li><a href="#" className="text-white">Tools, equipments</a></li>
              <li><a href="#" className="text-white">Sports and outdoor</a></li>
              <li><a href="#" className="text-white">Animal and pets</a></li>
              <li><a href="#" className="text-white">Machinery tools</a></li>
              <li><a href="#" className="text-white">More category</a></li>
            </ul>
          </Col>
          <Col md={9}>
            {/* Promo Banner */}
            <div className="bg-gradient p-4 rounded mb-4" style={{ 
              background: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="text-black mb-2">New User Special!</h4>
                  <p className="text-black-50 mb-3">Join now and get exclusive benefits:</p>
                  <ul className="text-black-50 ps-3">
                    <li>US $10 off your first order</li>
                    <li>Early access to deals</li>
                    <li>Personalized recommendations</li>
                  </ul>
                </div>
                <div className="text-end">
                  <Button 
                    variant="primary" 
                    className="me-2 px-4 auth-btn"
                    onClick={() => navigate('/Signup')}
                  >
                    Sign Up
                  </Button>
                  <Button 
                    variant="primary" 
                    className="px-4 auth-btn"
                    onClick={() => navigate('/Login')}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>

            {/* Trending Section */}
            <div className="bg-dark text-white p-3 rounded mb-3">
              <Row className="align-items-center">
                <Col md={8}>
                  <h4>Latest trending Electronic items</h4>
                  <h5 className="fw-bold">Learn more</h5>
                </Col>
                <Col md={4} className="text-end">
                  <Button variant="outline-light">View all</Button>
                </Col>
              </Row>
            </div>

            {/* Deals and Offers */}
            <div className="bg-light p-3 rounded mb-3">
              <h5>Deals and offers</h5>
              <p>Hygiene equipments</p>
              <div className="d-flex justify-content-between mb-3">
                <div className="text-center">
                  <div className="bg-danger text-white p-2 rounded">
                    <h4 className="mb-0">04 Days</h4>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-danger text-white p-2 rounded">
                    <h4 className="mb-0">13 Hour</h4>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-danger text-white p-2 rounded">
                    <h4 className="mb-0">34 Min</h4>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-danger text-white p-2 rounded">
                    <h4 className="mb-0">56 Sec</h4>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold">Home and outdoor</h6>
                <h6 className="fw-bold">Source now</h6>
              </div>
            </div>
          </Col>
        </Row>

        {/* Discount Banners */}
        <Row className="mb-4">
          <Col><Card className="text-center p-3 bg-primary text-white">Smart watches -25%</Card></Col>
          <Col><Card className="text-center p-3 bg-success text-white">Laptops -15%</Card></Col>
          <Col><Card className="text-center p-3 bg-warning text-dark">GoPro cameras -40%</Card></Col>
          <Col><Card className="text-center p-3 bg-info text-white">Headphones -25%</Card></Col>
          <Col><Card className="text-center p-3 bg-danger text-white">Canon cameras -25%</Card></Col>
        </Row>

        {/* Dynamic Product Grid */}
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={3} className="mb-4">
              <Card onClick={() => handleProductClick(product._id)} style={{ cursor: 'pointer' }}>
                <Card.Img variant="top" src={product.image || 'https://via.placeholder.com/150'} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.category}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">${product.price.toFixed(2)}</span>
                    {product.discount && (
                      <Badge bg="primary">-{product.discount}%</Badge>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Recommended Items Section */}
        <Container className="my-5">
          <h3 className="mb-4">Recommended Items</h3>
          <Row>
            {products.slice(0, 4).map((product) => (
              <Col key={`rec-${product._id}`} md={3} className="mb-4">
                <Card onClick={() => handleProductClick(product._id)} style={{ cursor: 'pointer' }}>
                  <Card.Img variant="top" src={product.image || 'https://via.placeholder.com/150'} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.category}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">${product.price.toFixed(2)}</span>
                      {product.discount && (
                        <Badge bg="primary">-{product.discount}%</Badge>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Suppliers and Newsletter Section */}
        <Container fluid className="bg-light py-5">
          <Container>
            <Row>
              <Col md={6}>
                <h3 className="mb-4">Suppliers by region</h3>
                <Row>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Arabic Emirates</strong><br />shopname.ae</ListGroup.Item>
                      <ListGroup.Item><strong>Denmark</strong><br />denmark.com.dk</ListGroup.Item>
                      <ListGroup.Item><strong>Australia</strong><br />shopname.ae</ListGroup.Item>
                      <ListGroup.Item><strong>France</strong><br />shopname.com.fr</ListGroup.Item>
                      <ListGroup.Item><strong>United States</strong><br />shopname.ae</ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Arabic Emirates</strong><br />shopname.ae</ListGroup.Item>
                      <ListGroup.Item><strong>Russia</strong><br />shopname.ru</ListGroup.Item>
                      <ListGroup.Item><strong>China</strong><br />shopname.ae</ListGroup.Item>
                      <ListGroup.Item><strong>Italy</strong><br />shopname.it</ListGroup.Item>
                      <ListGroup.Item><strong>Great Britain</strong><br />shopname.co.uk</ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Col>
              <Col md={6}>
                <h3 className="mb-4">Subscribe on our newsletter</h3>
                <p>Get daily news on upcoming offers from many suppliers all over the world</p>
                <Form className="mt-4">
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Email</strong></Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                  <Button variant="primary">Subscribe</Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Container>

        {/* Footer Section */}
        <footer className="bg-dark text-white py-5">
          <Container>
            <Row>
              <Col md={3}>
                <h5>Brand</h5>
                <p className="text-white-50">
                  Best information about the company gies here but now lorem ipsum is
                </p>
              </Col>
              <Col md={2}>
                <h6>About</h6>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white footer-link">About Us</a></li>
                  <li><a href="#" className="text-white footer-link">Find store</a></li>
                  <li><a href="#" className="text-white footer-link">Categories</a></li>
                  <li><a href="#" className="text-white footer-link">Blogs</a></li>
                </ul>
              </Col>
              <Col md={2}>
                <h6>Partnership</h6>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white footer-link">About Us</a></li>
                  <li><a href="#" className="text-white footer-link">Find store</a></li>
                  <li><a href="#" className="text-white footer-link">Categories</a></li>
                  <li><a href="#" className="text-white footer-link">Blogs</a></li>
                </ul>
              </Col>
              <Col md={2}>
                <h6>Information</h6>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white footer-link">Help Center</a></li>
                  <li><a href="#" className="text-white footer-link">Money Refund</a></li>
                  <li><a href="#" className="text-white footer-link">Shipping</a></li>
                  <li><a href="#" className="text-white footer-link">Contact us</a></li>
                </ul>
              </Col>
              <Col md={3}>
                <h6>For users</h6>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white footer-link">Login</a></li>
                  <li><a href="#" className="text-white footer-link">Register</a></li>
                  <li><a href="#" className="text-white footer-link">Settings</a></li>
                  <li><a href="#" className="text-white footer-link">My Orders</a></li>
                </ul>
                <h6 className="mt-3">Get app</h6>
                <div className="d-flex">
                  <Button variant="outline-light" size="sm" className="me-2">App Store</Button>
                  <Button variant="outline-light" size="sm">Google Play</Button>
                </div>
              </Col>
            </Row>
            <hr className="my-4 bg-secondary" />
            <Row>
              <Col className="text-center">
                <p className="mb-0 text-white">© 2023 Ecommerce.</p>
              </Col>
            </Row>
          </Container>
        </footer>
      </Container>
    </div>
  );
};

export default Home;