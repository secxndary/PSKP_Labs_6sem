const path = require('path');
const express = require('express');
const handlebar = require('express-handlebars');
const bodyParser = require('body-parser');
const authorRouter = require('./routes/authorRouter')();
const PORT = process.env.PORT ? process.env.PORT : 3000;
const hbs = handlebar.create({ extname: '.hbs' });
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));


app.use('/author', (req, res) => { authorRouter(req, res) });
app.get('/', (req, res) => { res.render('author', { layout: null, kek: 'hello world ebat' }) });

