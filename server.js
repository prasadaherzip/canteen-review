/**
 * server.js
 * 
 * This is the main entry point of the application.
 * It sets up the Express server and connects the routes.
 * 
 * VIVA QUESTIONS:
 * Q: What is Express?
 * A: It's a web framework for Node.js that simplifies handling HTTP requests.
 * 
 * Q: What is Middleware?
 * A: Functions that run before the final request handler (e.g., express.static, express.json).
 */

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Import Routes
const itemRoutes = require('./routes/itemRoutes');

// Middleware to serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Use Routes
// Any request starting with /api/items will be handled by itemRoutes
app.use('/api/items', itemRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
