const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const portNumber = 8000;

app.use(express.static(path.resolve(__dirname, './public')));
app.get('/html', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/home.html'));
});

app.get('/json', (req, res) => {
   res.sendFile(path.resolve(__dirname, './public/index.json'));
});

app.get('/uuid', (req, res) => {
    const uuid = uuidv4();
    res.status(200).json({ uuid });
});

app.get('/status/:statusCode', (req, res) => {
    const statusCode = parseInt(req.params.statusCode);
    res.status(statusCode).send(`Response with status code ${statusCode}`);
});

app.get('/delay/:time', (req, res) => {
    const time = parseInt(req.params.time);
    setTimeout(() => {
        res.status(200).send(`Response with a delay of ${time}`);
    }, time);
});

app.get('*', (req, res) => {
    res.status(404).send('<html><body><h1>Page not found</h1></body></html>');
});

app.listen(portNumber, () => {
    console.log(`Server is running on http://localhost:${portNumber}`);
});
