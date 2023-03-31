const handlebar = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const authorRouter = require('./routes/authorRouter');
const port = process.env.PORT ? process.env.PORT : 3000;
const hbs = handlebar.create({ extname: '.hbs' });
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.listen(port, () => console.log(`[OK] Server running at localhost:${port}/\n`));


app.use('/author', (req, res) => { authorRouter(req, res) });
app.get('/', (req, res) => { res.render('author', { layout: null, kek: 'hello world ebat' }) });

