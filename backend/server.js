const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create the Express app
const app = express();

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// MySQL Database Configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Example API endpoint to fetch data from the database
app.get('/api/data', (req, res) => {
  // Perform a MySQL query using the pool
  pool.query('SELECT * FROM your_table', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
    } else {
      res.json(result);
    }
  });
});

// Example API endpoint to insert data into the database
app.post('/api/data', (req, res) => {
  const { data } = req.body;

  // Perform a MySQL INSERT query using the pool
  pool.query('INSERT INTO your_table (column_name) VALUES (?)', [data], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
    } else {
      res.json({ message: 'Data inserted successfully' });
    }
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
