// components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex flex-grow-1 mx-3">
            <Form.Select className="me-2" style={{ maxWidth: '150px' }}>
              <option>All category</option>
              <option>Automobiles</option>
              <option>Clothes and wear</option>
              <option>Home interiors</option>
              <option>Computer and tech</option>
            </Form.Select>
            <Form.Control type="search" placeholder="Search" className="me-2" />
            <Button variant="primary">Search</Button>
          </Form>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/hot-offers" className="text-white">Hot offers</Nav.Link>
            <Nav.Link as={Link} to="/gift-boxes" className="text-white">Gift boxes</Nav.Link>
            <Nav.Link as={Link} to="/ProductDetails" className="text-white">Projects</Nav.Link>
            <Nav.Link as={Link} to="/help" className="text-white">Help</Nav.Link>
            <Nav.Link as={Link} to="/Cart" className="text-white">
              <i className="bi bi-cart-fill me-1"></i> Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;