const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Ability, AbilityBuilder } = require('casl');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authRouter');
const apiRouter = require('./routers/index');
const sequelize = require('./db');

const accessKey = 'kir';
const app = express();
const PORT = 5000;


app.use(express.static(__dirname + '/static'));
app.use(cookieParser('kir'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    const { rules, can } = AbilityBuilder.extract();
    if (req.cookies.accessToken) {
        jwt.verify(req.cookies.accessToken, accessKey, (err, payload) => {
            if (err) {
                next();
            } else if (payload) {
                req.payload = payload;
                if (req.payload.role === 'admin') {
                    can(['read', 'update'], ['Repos', 'Commits'], {
                        authorId: req.payload.id,
                    });
                    can('read', 'UsersCASL', { id: req.payload.id });
                    can('manages', 'all');
                    can('manage', 'all');
                }
                if (req.payload.role === 'user') {
                    can(['read', 'createU', 'update'], ['Repos', 'Commits'], {
                        authorId: req.payload.id,
                    });
                    can('read', 'UsersCASL', { id: req.payload.id });
                    can('manages', 'all');
                }
            }
        });
    } else {
        req.payload = { id: 0 };
        can('read', ['Repos', 'Commits'], 'all');
    }
    req.ability = new Ability(rules);
    next();
});

app.use('/', authRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
    res.status(404).send('<h2>[ERROR] 404: Not Found</h2>');
});


sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));
    })
    .catch(err => console.log(err));
