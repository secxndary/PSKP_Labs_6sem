const express = require('express');
const bodyParser = require('body-parser');
const contactRouter = require('./routers/contactRouter');
const app = express();
const port = 5000;
const hbs = require('express-handlebars').create({
    extname: '.hbs',
    helpers: { dismiss: () => "window.location.href = '/'" }
});


app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', contactRouter);


app.listen(process.env.PORT || port, () => console.log(`[OK] Server running at localhost:${port}/\n`));