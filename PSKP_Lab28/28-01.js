const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 5000;


import('webdav')
    .then(webdav => {
        const { createClient, AuthType } = webdav;

        const Error408 = res => res.status(408).send('[ERROR] 408: Request Timeout.');
        const Error404 = res => res.status(404).send('[ERROR] 404: Not found.');

        const client = createClient('https://webdav.yandex.ru', {
            username: 'knttrmir',
            password: 'kgspmoowactredxw',
        });



        app.post('/md/:name', (req, res) => {
            const nameFile = `/${req.params.name}`;
            client.exists(nameFile).then((result) => {
                if (!result) {
                    client.createDirectory(nameFile);
                    res.status(200).send('directory  created');
                } else Error408(res);
            });
        });


        app.post('/rd/:name', (req, res) => {
            const nameFile = `/${req.params.name}`;
            client.exists(nameFile).then((result) => {
                if (result) {
                    client.deleteFile(nameFile);
                    res.status(200).send('directory del');
                } else Error404(res);
            });
        });


        app.post('/up/:name', (req, res) => {
            try {
                const filePath = req.params.name;

                if (!fs.existsSync(filePath)) {
                    // Файл не существует
                    Error404(res);
                    return;
                }

                let rs = fs.createReadStream(filePath);
                let ws = client.createWriteStream(req.params.name);
                rs.pipe(ws);

                res.status(200).send('File good');
            } catch (err) {
                Error408(res);
            }
        });


        app.post('/down/:name', (req, res) => {
            const filePath = '/' + req.params.name;
            client
                .exists(filePath)
                .then((alreadyExists) => {
                    if (alreadyExists) {
                        let rs = client.createReadStream(filePath);
                        let ws = fs.createWriteStream(Date.now() + req.params.name
                        );
                        rs.pipe(ws);
                        rs.pipe(res);
                    } else {
                        Error404(res);
                    }
                })
                .then((message) => (message ? res.json(message) : null))
                .catch((err) => Error404(err));
        });


        app.post('/del/:name', (req, res) => {
            const nameFile = req.params.name;
            client.exists(nameFile).then((result) => {
                if (result) {
                    client.deleteFile(nameFile);
                    res.status(200).send('file del');
                } else Error404(res);
            });
        });


        app.post('/copy/:from/:to', (req, res) => {
            const nameFrom = req.params.from;
            const nameTo = `${req.params.to}`;
            client
                .exists(nameFrom)
                .then((result) => {
                    if (result) {
                        client.copyFile(nameFrom, nameTo);
                        res.status(200).send('file copi');
                    } else Error404(res);
                })
                .catch(() => {
                    Error408(res);
                });
        });


        app.post('/move/:from/:to', (req, res) => {
            const nameFrom = req.params.from;
            const nameTo = req.params.to;
            client
                .exists(nameFrom)
                .then((result) => {
                    if (result) {
                        client.moveFile(nameFrom, nameTo);
                        res.status(200).send('file move');
                    } else Error404(res);
                })
                .catch(() => {
                    Error408(res);
                });
        });


        app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));
    })
    .catch(err => console.error('[ERROR] WebDAV: ', err.message));