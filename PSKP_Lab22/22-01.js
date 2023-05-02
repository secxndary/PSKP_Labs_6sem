const express = require('express');
const fs = require('fs');
const app = express();

const passport = require('passport');
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





app.get('/login', (req, res) => {
    // Ввод имени и пароля для аутентифицированного доступа к ресурсу
});

app.get('logout', (req, res) => {
    // Отключить аутентифицированный доступ к ресурсу 
    req.session.logout = true;
    delete req.headers['authorization'];
});

app.get('/resource', (req, res) => {
    // Ресурс отправляет сообщение RESOURCE
    res.send('RESOURCE');
    // При попытке неаутентифицированного доступа выполняет переадресацию на GET /login 
});

// other URIs => 404 error




const getCredentials = user => users.find(e => e.user.toUpperCase() == user.toUpperCase());
const verifyPassword = (firstPassword, secondPassword) => firstPassword == secondPassword;

app.listen(process.env.PORT || port, () => console.log(`[OK] Server running at localhost:${port}/\n`));