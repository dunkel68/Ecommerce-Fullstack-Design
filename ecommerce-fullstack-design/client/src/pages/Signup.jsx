import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { 
  PersonFill as UserIcon,
  EnvelopeFill as MailIcon,
  LockFill as LockIcon,
  CheckCircleFill as CheckIcon
} from 'react-bootstrap-icons';
import axios from 'axios';
import '../styles/Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Frontend validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      
      // Send signup request to backend
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);
      
      // On successful signup
      setSuccess(true);
      setTimeout(() => {
        navigate('/login'); // Redirect to login after successful signup
      }, 1500);
      
    } catch (err) {
      // Handle different error cases
      if (err.response) {
        // The request was made and the server responded with a status code
        setError(err.response.data.error || 'Signup failed. Please try again.');
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="auth-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="auth-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="auth-logo">ECOMMERCE</h2>
                  <p className="text-muted">Create your account</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && (
                  <Alert variant="success">
                    Account created successfully! Redirecting to login...
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text"><UserIcon /></span>
                      <Form.Control
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text"><MailIcon /></span>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text"><LockIcon /></span>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password (min 8 characters)"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="8"
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text"><CheckIcon /></span>
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 auth-btn"
                    disabled={
                      loading || 
                      !formData.name || 
                      !formData.email || 
                      !formData.password || 
                      !formData.confirmPassword
                    }
                  >
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </Form>

                <div className="terms-text text-center mt-3">
                  <small className="text-muted">
                    By signing up, you agree to our <Link to="/terms" className="text-link">Terms</Link> and <Link to="/privacy" className="text-link">Privacy Policy</Link>
                  </small>
                </div>

                <div className="divider my-4">
                  <span>OR</span>
                </div>

                <div className="text-center mt-4">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" className="text-link">Log in</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;