const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const PORT = 5000;

let options = {
    key: fs.readFileSync('./localhost-key.pem').toString(),
    cert: fs.readFileSync('./localhost.pem').toString(),
};

app.get('/', (req, res) => res.send('hello wolrd hehe'));

https.createServer(options, app).listen({
    port: PORT
}, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));