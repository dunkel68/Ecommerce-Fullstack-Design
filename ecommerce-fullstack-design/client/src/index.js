import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';
import './index.css';

// Get the root container
const container = document.getElementById('root');

// Create a root
const root = createRoot(container); // Create root instance

// Render your app
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);