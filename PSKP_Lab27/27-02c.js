const http = require('http');
const fs = require('fs');
const { ClientVerify } = require('./ECP');

let resource_options = {
    host: 'localhost',
    path: '/resource',
    port: 5000,
    method: 'GET',
};

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'GET',
    headers: { 'content-type': 'application/json' },
};


setTimeout(() => {
    const request = http.request(resource_options, res => {
        const file = fs.createWriteStream('./client.txt');
        res.pipe(file);

        const req = http.request(options, res => {
            let data = '';
            res.on('data', chunk => data += chunk.toString());

            res.on('end', () => {
                let sign = JSON.parse(data);
                const x = new ClientVerify(sign);
                const readStream = fs.createReadStream('./encrypted.txt');
                x.verify(readStream, (result) => {
                    if (result) {
                        console.log('verify success');
                    } else {
                        console.log('verify failure');
                    }
                });
            });
        });

        req.on('error', err => { console.log('http.request: error:', err.message); });
        req.end();
    });

    request.on('error', err => { console.log('http.request: error:', err.message); });
    request.end();

}, 500);
