const { ServerSign } = require('./ECP');
const fs = require('fs');
const app = require('express')();

app.get('/resource', (req, res, next) => {
    let readStream = fs.createReadStream('./file.txt');
    res.statusCode = 200;
    readStream.pipe(res);
    readStream.on('close', () => {
        res.end();
    });
});

app.get('/', (req, res, next) => {
    const ss = new ServerSign();
    const readStream = fs.createReadStream('./file.txt');
    ss.getSignContext(readStream, (cb) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(cb));
    });
});


app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));