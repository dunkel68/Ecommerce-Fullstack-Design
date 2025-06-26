const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Get token from header (key: 'x-auth-token')
    const token = req.header('x-auth-token');

    // If no token, deny access
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;