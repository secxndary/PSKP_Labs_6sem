const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Ability, AbilityBuilder } = require('casl');
const authRouter = require('./routers/authRouter');
const apiRouter = require('./routers/index');
const sequelize = require('./db');

const accessSecret = 'secxndary';
const app = express();
const PORT = 5000;


app.use(express.static(__dirname + '/static'));
app.use(cookieParser('secxndary'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const { rules, can } = AbilityBuilder.extract();
    console.log('accessToken:', req.cookies.accessToken);

    if (req.cookies.accessToken) {
        jwt.verify(req.cookies.accessToken, accessSecret, (err, payload) => {
            if (err) {
                console.log('err', err);
                next();
            } else if (payload) {
                req.payload = payload;
                console.log('payload:', req.payload, '\n');

                switch (req.payload.role) {
                    case 'admin':
                        can(['read', 'update'], ['Repos', 'Commits'], {
                            authorId: req.payload.id,
                        });
                        can('read', 'UsersCASL', { id: req.payload.id });
                        can('manage', 'all');
                        break;

                    case 'user':
                        can(['read', 'create', 'update'], ['Repos', 'Commits'], {
                            authorId: req.payload.id,
                        });
                        can('read', 'UsersCASL', { id: req.payload.id });
                        break;

                    case 'guest':
                        can('read', ['Repos', 'Commits']);
                        break;

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
app.use((req, res, next) => { res.status(404).send('<h2>[ERROR] 404: Not Found</h2>'); });


sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));
    })
    .catch(err => console.log(err));
