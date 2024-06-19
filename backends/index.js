const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    if (username && password) {
        res.status(200).send({ success: true, message: 'User registered successfully' });
    } else {
        res.status(400).send({ success: false, message: 'Username and password are required' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${3000}`);
});
