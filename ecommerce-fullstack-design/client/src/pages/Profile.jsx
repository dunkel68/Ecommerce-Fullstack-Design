import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Image, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profileImage: 'https://via.placeholder.com/150',
    joinDate: '2023-01-15'
  });

  // Check if user is logged in (simulated)
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, you would check authentication status here
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
      
      if (!loggedIn) {
        navigate('/login');
      } else {
        // Load user data (simulated)
        const savedData = localStorage.getItem('userProfile');
        if (savedData) {
          setUserData(JSON.parse(savedData));
        }
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({ ...prev, profileImage: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage (in a real app, you would call an API)
    localStorage.setItem('userProfile', JSON.stringify(userData));
    setShowSuccess(true);
    setIsEditing(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  if (!isLoggedIn) {
    return null; // Already redirected to login page
  }

  return (
    <Container className="my-5 profile-container">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">My Profile</h2>
                <Button 
                  variant="outline-danger" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>

              {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                  Profile updated successfully!
                </Alert>
              )}

              <Row>
                {/* Profile Image Column */}
                <Col md={4} className="text-center">
                  <div className="position-relative mb-3">
                    <Image 
                      src={userData.profileImage} 
                      roundedCircle 
                      width={150}
                      height={150}
                      className="border border-primary"
                    />
                    {isEditing && (
                      <div className="position-absolute bottom-0 end-0">
                        <Form.Group controlId="formImage" className="mb-0">
                          <Form.Label className="btn btn-primary btn-sm rounded-circle">
                            <i className="bi bi-camera"></i>
                            <Form.Control 
                              type="file" 
                              accept="image/*" 
                              onChange={handleImageChange}
                              className="d-none"
                            />
                          </Form.Label>
                        </Form.Group>
                      </div>
                    )}
                  </div>
                  <p className="text-muted">
                    Member since {new Date(userData.joinDate).toLocaleDateString()}
                  </p>
                </Col>

                {/* Profile Details Column */}
                <Col md={8}>
                  {isEditing ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="address"
                          value={userData.address}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-end gap-2">
                        <Button 
                          variant="outline-secondary" 
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <>
                      <div className="mb-4">
                        <h4>{userData.name || 'Your Name'}</h4>
                        <p className="text-muted">{userData.email || 'user@example.com'}</p>
                      </div>

                      <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex justify-content-between px-0">
                          <span>Phone:</span>
                          <span>{userData.phone || 'Not provided'}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between px-0">
                          <span>Address:</span>
                          <span>{userData.address || 'Not provided'}</span>
                        </ListGroup.Item>
                      </ListGroup>

                      <div className="d-flex justify-content-end mt-4">
                        <Button 
                          variant="primary"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Additional Profile Sections */}
          <Row className="mt-4">
            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Account Security</Card.Title>
                  <Button variant="outline-primary" className="w-100 mb-2">
                    Change Password
                  </Button>
                  <Button variant="outline-primary" className="w-100">
                    Two-Factor Authentication
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Order History</Card.Title>
                  <p className="text-muted">You haven't placed any orders yet.</p>
                  <Button variant="primary" className="w-100">
                    View All Orders
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;