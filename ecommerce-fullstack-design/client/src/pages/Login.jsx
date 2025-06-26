import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, Row, Col, Form, Button, Alert, Card, Spinner 
} from 'react-bootstrap';
import { 
  EnvelopeFill as MailIcon,
  LockFill as LockIcon,
  BoxArrowInRight as LoginIcon,
  Facebook,
  Twitter 
} from 'react-bootstrap-icons';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const { login, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is already handled in AuthContext, but we can add additional handling here
      setLocalError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                  <p className="text-muted">Login to your dashboard</p>
                </div>

                {(authError || localError) && (
                  <Alert variant="danger" dismissible onClose={() => setLocalError('')}>
                    {authError || localError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
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
                        autoComplete="username"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text"><LockIcon /></span>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        autoComplete="current-password"
                      />
                    </div>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 auth-btn"
                    disabled={loading || !formData.email || !formData.password}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LoginIcon className="me-2" /> Login
                      </>
                    )}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <Link to="/forgot-password" className="text-link">Forgot password?</Link>
                </div>

                <div className="divider my-4">
                  <span>OR</span>
                </div>

                <div className="social-auth">
                  <Button variant="outline-primary" className="social-btn">
                    <Facebook className="me-2" /> Continue with Facebook
                  </Button>
                  <Button variant="outline-primary" className="social-btn mt-2">
                    <Twitter className="me-2" /> Continue with Twitter
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/signup" className="text-link">Sign up</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;