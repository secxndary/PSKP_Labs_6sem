// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const passport = require('passport');
// const cp = require('cookie-parser');
// const localStrategy = require('passport-local').Strategy;
// const app = express();

// const PORT = 5000;
// const users = require('./users.json');


// app.use(cp());
// app.use(express.static(path.join(__dirname, 'static')));
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({ secret: 'my_secret' }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

// // app.use(session({
// //     secret: 'my_secret',
// //     resave: false,
// //     saveUninitialized: false
// // }));
// // passport.use(
// //     new localStrategy((login, password, done) => {
// //         console.log('login: ' + login + ' password: ' + password);
// //         for (let user of users)
// //             if (user.login === login && user.password === password)
// //                 return done(null, user);
// //         return done(null, false, { message: 'Invalid login or password' });
// //     }));


// passport.use(new Strategy((login, password, done) => {
//     const users = JSON.parse(readFileSync(join(__dirname, './users.json')))

//     const index = users.findIndex(e => e.login === username)
//     if (index === -1) {
//         return done(null, false, { 'Error': 'incorrect credentials' })
//     }

//     const user = users[index]

//     if (user.password !== password) {
//         return done(null, false, { 'Error': 'incorrect credentials' })
//     }

//     return done(null, user)
// }))


// app.get('/', (req, res) => res.redirect('/login'));


// app.get('/login', (req, res, next) => {
//     const rs = fs.ReadStream('./static/login.html');
//     rs.pipe(res);
// });


// app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/resource',
//         failureRedirect: '/login'
//     }));



// app.get('/resource', (req, res) => {
//     if (req.user)
//         res.end(`Welcome to resource, ${req.user.login}`)
//     else
//         res.redirect('/login');
//     // const cookies = req.cookies;
//     // if (req.cookies && req.cookies.token) {
//     //     if (req.cookies.token.token === 'xxx-yyy-zzz')
//     //         res.send('SUPER SECRET RESOURCE');
//     //     else
//     //         res.redirect('/login');
//     // }
// });


// app.get('*', (req, res) => { res.status(404).send('[ERROR] 404: Not Found'); });


// app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));




import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const PORT = 5000;
const app = express()

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new Strategy((username, password, done) => {
    const users = JSON.parse(readFileSync(join(__dirname, './users.json')))

    const index = users.findIndex(e => e.username === username)
    if (index === -1) {
        return done(null, false, { 'Error': 'incorrect credentials' })
    }

    const user = users[index]

    if (user.password !== password) {
        return done(null, false, { 'Error': 'incorrect credentials' })
    }

    return done(null, user)
}))

app.get('/login', (_req, res) => {
    res.sendFile(join(__dirname, './static/login.html'))
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/resource',
    failureRedirect: '/login'
}))

app.get('/resource', (req, res) => {
    if (req.user) {
        return res.end(`resource owned by ${req.user.username}`)
    }

    res.writeHead(401, 'unauthorized')
    res.end('unauthorized')
})

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }

        res.redirect('/login')
    })
})


app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));