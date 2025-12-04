/**
 * config/db.js
 * 
 * This file handles the connection to the SQLite database.
 * It follows the "Singleton" pattern implicitly because Node.js caches modules.
 * 
 * VIVA QUESTIONS:
 * Q: Why do we need a separate file for the database?
 * A: To keep the code modular. If we change the database (e.g., to MongoDB), we only change this file.
 * 
 * Q: What is sqlite3.verbose()?
 * A: It enables long stack traces, which helps in debugging.
 */

const sqlite3 = require('sqlite3').verbose();

// Connect to the database
// ':memory:' means the database is stored in RAM and lost when the server stops.
// In a real app, you would use a file path like './canteen.db'.
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the in-memory SQLite database.');
        initializeDatabase(); // Call function to create tables and data
    }
});

/**
 * initializeDatabase
 * Creates the necessary tables and inserts dummy data.
 */
function initializeDatabase() {
    db.serialize(() => {
        // Create 'items' table
        db.run(`CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY, 
            name TEXT, 
            category TEXT, 
            description TEXT, 
            image TEXT
        )`);

        // Insert dummy data
        const stmt = db.prepare("INSERT INTO items (name, category, description, image) VALUES (?, ?, ?, ?)");

        // Dummy Data for Drinks
        const drinks = [
            ["Cola", "drinks", "Refreshing cola drink", "https://via.placeholder.com/150"],
            ["Orange Juice", "drinks", "Fresh orange juice", "https://via.placeholder.com/150"],
            ["Lemonade", "drinks", "Cool lemonade", "https://via.placeholder.com/150"],
            ["Iced Tea", "drinks", "Peach iced tea", "https://via.placeholder.com/150"],
            ["Water", "drinks", "Mineral water", "https://via.placeholder.com/150"]
        ];

        drinks.forEach(drink => stmt.run(drink));

        stmt.finalize();
        console.log('Database initialized with dummy data.');
    });
}

// Export the database object so it can be used in other files (like controllers)
module.exports = db;
