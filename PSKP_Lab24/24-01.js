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
app.use((request, response, next) => {
    const { rules, can } = AbilityBuilder.extract();
    if (request.cookies.accessToken) {
        jwt.verify(request.cookies.accessToken, accessKey, (err, payload) => {
            if (err) {
                next();
            } else if (payload) {
                request.payload = payload;
                if (request.payload.role === 'admin') {
                    can(['read', 'update'], ['Repos', 'Commits'], {
                        authorId: request.payload.id,
                    });
                    can('read', 'UsersCASL', { id: request.payload.id });
                    can('manages', 'all');
                    can('manage', 'all');
                }
                if (request.payload.role === 'user') {
                    can(['read', 'createU', 'update'], ['Repos', 'Commits'], {
                        authorId: request.payload.id,
                    });
                    can('read', 'UsersCASL', { id: request.payload.id });
                    can('manages', 'all');
                }
            }
        });
    } else {
        request.payload = { id: 0 };
        can('read', ['Repos', 'Commits'], 'all');
    }
    request.ability = new Ability(rules);
    next();
});

app.use('/', authRouter);
app.use('/api', apiRouter);

app.use((request, response, next) => {
    response.status(405).send('Incorrect Method or URL');
});

sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));
    })
    .catch((error) => console.log(error));
