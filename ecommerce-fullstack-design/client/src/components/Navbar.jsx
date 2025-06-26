// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar, Nav, Container, Form, Button, Badge } from 'react-bootstrap';
import { BiCart, BiUser, BiMessage, BiLogIn, BiLogOut } from 'react-icons/bi';

const CustomNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" sticky="top">
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
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="text-white">
                  <BiUser className="me-1" /> Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/messages" className="text-white">
                  <BiMessage className="me-1" /> Messages
                </Nav.Link>
                <Nav.Link as={Link} to="/orders" className="text-white">
                  Orders
                </Nav.Link>
                <Nav.Link as={Link} to="/cart" className="text-white position-relative">
                  <BiCart className="me-1" /> Cart
                  {user.cartItems?.length > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                      {user.cartItems.length}
                    </Badge>
                  )}
                </Nav.Link>
                <Button variant="outline-light" onClick={logout} className="ms-2">
                  <BiLogOut className="me-1" /> Logout
                </Button>
              </>
            ) : (
              <Button variant="outline-light" as={Link} to="/login">
                <BiLogIn className="me-1" /> Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;