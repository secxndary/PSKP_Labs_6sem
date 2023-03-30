const handlebar = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require('express');
const authorRouter = require('./routes/authorRouter')();


const port = process.env.PORT ? process.env.PORT : 3000;
const hbs = handlebar.create({ extname: '.hbs' });
const app = express();


app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/author', (req, res) => authorRouter(req, res));



app.listen(port, () => console.log(`[OK] Server running at localhost:${port}/\n`));