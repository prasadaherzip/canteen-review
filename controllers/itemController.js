/**
 * controllers/itemController.js
 * 
 * This file contains the "Business Logic". 
 * It receives requests from the routes, interacts with the database, and sends responses.
 * 
 * VIVA QUESTIONS:
 * Q: What is a Controller?
 * A: It acts as an intermediary between the Model (Database) and the View (Client/Frontend).
 * 
 * Q: Why use callbacks here?
 * A: SQLite operations are asynchronous. We pass a function (callback) to be executed when the DB operation finishes.
 */

const db = require('../config/db');

// Function to get all items
exports.getAllItems = (req, res) => {
    const sql = "SELECT * FROM items";

    db.all(sql, [], (err, rows) => {
        if (err) {
            // If there's an error, send a 400 Bad Request status
            res.status(400).json({ "error": err.message });
            return;
        }
        // Send the data back as JSON
        res.json({
            "message": "success",
            "data": rows
        });
    });
};

// Function to add a new item (Placeholder for future implementation)
exports.addItem = (req, res) => {
    // In a real app, we would read data from req.body
    // const { name, category, description, image } = req.body;

    res.json({
        "message": "Item addition not fully implemented yet (requires POST request handling)"
    });
};
