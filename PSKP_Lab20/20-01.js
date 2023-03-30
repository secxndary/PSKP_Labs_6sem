const handlebar = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require('express');
// const authorRouter = require('./routes/authorRouter.js');
const { Sequelize } = require('sequelize');


const port = process.env.PORT ? process.env.PORT : 3000;
const hbs = handlebar.create({ extname: '.hbs' });
const app = express();
const sequelize = new Sequelize('Sublish', 'sa', '1111', {
    host: 'MSSQLLocalDB\\(localDB)',
    dialect: 'mssql',
    dialectModule: require('msnodesqlv8/lib/sequelize'),
    bindParam: false,
    /*logging: false,*/
    dialectOptions: {
        options: {
            connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=(LocalDB)\\MSSQLLocalDB;Database=Sublish;Trusted_Connection=yes;',
        },
    },
    define: {
        timestamps: false,
    }
});

sequelize.authenticate()
    .then(() => { console.log('[OK] Connected to database.\n'); })
    .catch(err => {
        console.log('[ERROR] Sequelize: ', err);
        sequelize.close();
    });

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');



app.get('/', (req, res) => { res.render('index', { layout: null, hw: 'hello world ebat' }) });



app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/author', authorRouter);

app.listen(port, () => console.log(`[OK] Server running at localhost:${port}/\n`));