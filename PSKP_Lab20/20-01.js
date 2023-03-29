import handlebar from 'express-handlebars';
import bodyParser from 'body-parser';
import express from 'express';
// import path from 'path';
import authorRouter from './routes/authorRouter.js';

// const __dirname = 'C:\\Users\\valda\\source\\repos\\semester#6\\ПСКП\\PSKP_Lab20\\static\\';
const port = process.env.PORT ? process.env.PORT : 3000;
const hbs = handlebar.create({ extname: '.hbs' });
const app = express();

app.engine('.hbs', hbs.engine);
// app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', '.hbs');



app.get('/', (req, res) => { res.render('index', { layout: null, hw: 'hello world ebat' }) });



app.use(bodyParser.urlencoded({ extended: false }));
app.use('/author', authorRouter);

app.listen(port, () => console.log(`[OK] Server running at localhost:${port}/\n`));