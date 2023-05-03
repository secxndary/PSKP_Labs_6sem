const express = require('express');
const fs = require('fs');
const app = express();

const passport = require('passport');
const auth = require('basic-auth');
const BasicStrategy = require('passport-http').BasicStrategy;
const session = require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: 'qweqwe'
});

const port = 5000;
const users = fs.readFileSync('users.json');

app.use(express.static(__dirname + '/static'));
app.use(express.json());
app.use(session);


app.use(passport.initialize());
passport.use(new BasicStrategy((user, password, done) => {
    console.log('passport.use ', user, password);
    let rc = null;
    let credentials = getCredentials(user);
    if (!credentials)
        rc = done(null, false, { message: 'incorrect username' });
    else if (!verifyPassword(credentials.password, password))
        rc = done(null, false, { message: 'incorrect password' });
    else
        rc = done(null, user);
    return rc;
}));





// Ввод имени и пароля для аутентифицированного доступа к ресурсу
app.get(
    '/login',
    passport.authenticate('basic', { session: false }),
    (req, res, next) => { res.redirect('/resource'); });






app.get('/logout', (req, res, next) => {
    // Отключить аутентифицированный доступ к ресурсу 
    req.session.logout = true;
    delete req.headers['authorization'];
});

app.get('/resource', (req, res, next) => {
    // Ресурс отправляет сообщение RESOURCE
    res.send('RESOURCE');
    // При попытке неаутентифицированного доступа выполняет переадресацию на GET /login 
});

// other URIs => 404 error



const check = (creds1, creds2) => creds1.name.toUpperCase() == creds2.name.toUpperCase() && creds1.pass == creds2.pass;
// const getCredentials = name => users.find(u => u.name.toUpperCase() == name.toUpperCase());
const verifyPassword = (firstPassword, secondPassword) => firstPassword == secondPassword;

app.listen(process.env.PORT || port, () => console.log(`[OK] Server running at localhost:${port}/\n`));






    // const mycred = { name: "secxndary", pass: "qwe" };
    // const credentials = auth(req);
    // if (!credentials) {
    //     res.status(401).append('WWW-Authenticate', 'Basic realm="Resurse-realm"').send('Access denied');
    //     console.log('denied: ', credentials);
    // }
    // else if (!check(credentials, mycred)) {
    //     res.status(401).append('WWW-Authenticate', 'Basic realm="Resurse-realm"').send('Incorrect name or pass');
    //     console.log('incorrect: ', credentials);
    // }
    // else {
    //     res.redirect('/resource');
    //     console.log('redirect resource: ', credentials);
    // }