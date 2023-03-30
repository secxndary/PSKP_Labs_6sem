import handlebar from 'express-handlebars';
import bodyParser from 'body-parser';
import express from 'express';
import authorRouter from './routes/authorRouter.js';

const port = process.env.PORT ? process.env.PORT : 3000;
const hbs = handlebar.create({ extname: '.hbs' });
const app = express();

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/author', authorRouter);



app.get('/', (req, res) => { res.render('index', { layout: null, hw: 'hello world ebat' }) });




app.listen(port, () => console.log(`[OK] Server running at localhost:${port}/\n`));