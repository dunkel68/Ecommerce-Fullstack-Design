const app = require('./app');
const PORT = process.env.PORT || 5000;

// Create server instance
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is in use, trying port ${Number(PORT) + 1}...`);
    // Try the next port
    app.listen(Number(PORT) + 1);
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});