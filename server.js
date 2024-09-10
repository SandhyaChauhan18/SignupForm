const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;

    fs.appendFile('users.txt', userData, (err) => {
        if (err) return res.send('Error saving data.');
        
        // Log the user data to the console
        console.log(`User data saved: ${userData.trim()}`);
        
        res.send('Sign up successful! Your data has been saved.');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
