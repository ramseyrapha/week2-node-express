require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date()} ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('My Week 2 API!');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/user', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).send('Error: Missing details in request body.');
    }
   
    res.send(`Hello, ${name}, we received a request from ${email}`);
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


