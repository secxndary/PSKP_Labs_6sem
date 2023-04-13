const path = require('path');
const express = require('express');
const prikoldes = require('hbs');
const handlebar = require('express-handlebars');
const authorRouter = require('./routes/authorRouter')();
const bookRouter = require('./routes/bookRouter')();
const genreRouter = require('./routes/genreRouter')();
const customerRouter = require('./routes/customerRouter')();
const orderRouter = require('./routes/orderRouter')();
const PORT = process.env.PORT ? process.env.PORT : 3000;
const hbs = handlebar.create({ extname: '.hbs' });
const app = express();


prikoldes.registerPartials(__dirname + 'views/partials');
app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs.engine);


app.use('/author', (req, res) => { authorRouter(req, res) });
app.use('/book', (req, res) => { bookRouter(req, res) });
app.use('/genre', (req, res) => { genreRouter(req, res) });
app.use('/customer', (req, res) => { customerRouter(req, res) });
app.use('/order', (req, res) => { orderRouter(req, res) });