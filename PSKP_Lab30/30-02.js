const express = require('express');
const app = express();
const PORT = 5000;


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use('/', express.static('public'));


app.use((req, res, next) => {
    console.log('Request handler');
    next();
});


app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));