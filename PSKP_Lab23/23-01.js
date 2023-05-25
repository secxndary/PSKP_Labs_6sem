const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cp = require('cookie-parser');
const localStrategy = require('passport-local').Strategy;
const app = express();

const PORT = 5000;
const users = require('./users.json');


app.use(cp());
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'my_secret' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


passport.use(
    new localStrategy((login, password, done) => {
        for (let user of users)
            if (user.login === login && user.password === password)
                return done(null, user);
        return done(null, false, { message: 'Invalid login or password' });
    }));



app.get('/', (req, res) => res.redirect('/login'));


app.get('/login', (req, res, next) => {
    console.log(users);
    const rs = fs.ReadStream('./static/login.html');
    rs.pipe(res);
});


app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/resource',
        failureRedirect: '/login'
    }));


// app.post('/login', (req, res) => {
//     console.log(req.body);
//     // проверка credentials
//     // generate token
//     res.cookie('token', 'xxx-yyy-zzz').redirect('/resource');
// });


app.get('/resource', (req, res) => {
    const cookies = req.cookies;
    if (req.cookies && req.cookies.token) {
        if (req.cookies.token.token === 'xxx-yyy-zzz')
            res.send('SUPER SECRET RESOURCE');
        else
            res.redirect('/login');
    }
});


app.get('*', (req, res) => { res.status(404).send('[ERROR] 404: Not Found'); });


app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));