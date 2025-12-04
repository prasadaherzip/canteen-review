/**
 * routes/itemRoutes.js
 * 
 * This file defines the API endpoints (URLs) for items.
 * It maps a URL (like /api/items) to a specific function in the controller.
 * 
 * VIVA QUESTIONS:
 * Q: What is Express Router?
 * A: It's a mini-application that only handles routing. It helps organize routes into separate files.
 */

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Define the route for getting all items
// When a GET request is made to '/', call itemController.getAllItems
// Note: This '/' is relative to the path defined in server.js (which will be /api/items)
router.get('/', itemController.getAllItems);

// Define a route for adding an item (POST)
router.post('/', itemController.addItem);

module.exports = router;
