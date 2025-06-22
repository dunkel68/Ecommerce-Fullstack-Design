import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from '../components/Navbar';
import '../styles/Cart.css';

const Cart = () => {
  // Sample cart data
  const cartItems = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 59.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      quantity: 2,
      image: 'https://via.placeholder.com/80',
      category: 'Wearables'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 89.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80',
      category: 'Audio'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = (subtotal * 0.08).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax)).toFixed(2);

  return (
    <>
    <CustomNavbar />
    <Container className="my-5">
      <h2 className="mb-4">My Cart</h2>
      <Row>
        {/* Left Section - Cart Items (2/3 width) */}
        <Col lg={8} className="mb-4">
          {cartItems.length > 0 ? (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="border-0 shadow-sm mb-3">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="img-fluid rounded"
                        style={{ maxHeight: '80px' }}
                      />
                    </Col>
                    <Col md={4}>
                      <h5 className="mb-1">{item.name}</h5>
                      <p className="text-muted mb-1">{item.category}</p>
                    </Col>
                    <Col md={2}>
                      <Form.Control 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={() => {}}
                        style={{ width: '60px' }}
                      />
                    </Col>
                    <Col md={2} className="text-center">
                      <h5 className="mb-0">${item.price.toFixed(2)}</h5>
                    </Col>
                    <Col md={2} className="text-end">
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => console.log('Remove item', item.id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <Card className="text-center p-5">
              <h4>Your cart is empty</h4>
              <p className="text-muted">Browse our products to add items</p>
              <Button variant="primary">Continue Shopping</Button>
            </Card>
          )}
        </Col>

        {/* Right Section - Checkout (1/3 width) */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="border-bottom pb-3">Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Tax</span>
                  <span>${tax}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </ListGroup.Item>
              </ListGroup>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mt-3"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
              <p className="text-muted small mt-2 text-center">
                or <a href="#" className="text-primary">continue shopping</a>
              </p>
            </Card.Body>
          </Card>

          {/* Promo Code Section */}
          <Card className="mt-3 shadow-sm">
            <Card.Body>
              <Card.Title className="border-bottom pb-3">Promo Code</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Enter promo code</Form.Label>
                <div className="d-flex">
                  <Form.Control type="text" placeholder="e.g. SUMMER2023" />
                  <Button variant="outline-primary" className="ms-2">Apply</Button>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Cart;