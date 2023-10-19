const http = require('http');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('/');
    let route = urlPath[1];
    let subRoute = urlPath[2];

    console.log(route, subRoute)
    if (route === 'html') {
        fs.readFile('home.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    else if (route === 'json') {
        fs.readFile('index.json', (err, data) => {
            if (err) {
                res.writeHead(500, 'utf-8', { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                const jsonData = JSON.parse(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(jsonData, null, 2));
            }
        });
    }
    else if (route === 'uuid') {
        let uuid = uuidv4();
        const jsonResponse = {
            uuid: uuid
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonResponse, null, 2));
    }
    else if (route === 'status' && subRoute) {
        res.writeHead(subRoute, { 'Content-Type': 'text/plain' });
        res.end(`Responce with status code ${subRoute}`)
    }
    else if (route === 'delay' && subRoute) {
        let time = parseInt(subRoute);
        setTimeout((subRoute) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Response with a delay of ${time}`)
        }, 3000)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Page not found</h1></body></html>');
    }
});

const portNumber = 8000;

server.listen(portNumber, () => {
    console.log(`Server is running on http://localhost:${portNumber}`);
});
