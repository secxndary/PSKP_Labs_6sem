const http = require('http');
const { ClientDH, decipherFile } = require('./DH');
const fs = require('fs');
let params;
let clientDH;

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'GET',
    headers: { 'content-type': 'application/json' },
};
let optionsKey = {
    host: 'localhost',
    path: '/key',
    port: 5000,
    method: 'POST',
};
let optionsResource = {
    host: 'localhost',
    path: '/resource',
    port: 5000,
    method: 'GET',
};



setTimeout(() => {
    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk.toString();
        });

        res.on('end', () => {
            let serverContext = JSON.parse(data);
            clientDH = new ClientDH(serverContext);
            params = JSON.stringify(clientDH.getContext());

            const req2 = http.request(optionsKey, (res) => {
                if (res.statusCode !== 409) {
                    const req3 = http.request(optionsResource, (res) => {
                        if (res.statusCode !== 409) {
                            const file = fs.createWriteStream('./decrypted.txt');
                            const key = Buffer.alloc(32);
                            let clientSecret = clientDH.getSecret(serverContext);
                            clientSecret.copy(key, 0, 0, 32);
                            decipherFile(res, file, key);
                        }
                    });
                    req3.on('error', (e) => {
                        console.log('http.request: error:', e.message);
                    });
                    req3.end();
                }
            });
            req2.on('error', (e) => {
                console.log('http.request: error:', e.message);
            });
            console.log('params: ', params, '\n');
            req2.write(params);
            req2.end();
        });
    });
    req.on('error', (e) => {
        console.log('http.request: error:', e.message);
    });
    req.end();
}, 500);