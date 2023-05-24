const express = require('express');
const fs = require('fs');
const passport = require('passport');
const app = express();

const PORT = 5000;
const users = JSON.parse(fs.readFileSync('users.json'));



// Перенеправление на /login
app.get('/', (req, res) => res.redirect('/login'));


// Ввод логина и пароля в prompt'е для аутентифицированного доступа к ресурсу
app.get('/login', (req, res, next) => {
    const rs = fs.ReadStream('./static/login.html');
    rs.pipe(res);
});


// Ресурс отправляет сообщение RESOURCE
// При попытке неаутентифицированного доступа выполняет переадресацию на GET /login 
app.get('/resource', (req, res) => {
    if (req.headers['authorization'])
        res.send('SUPER SECRET RESOURCE');
    else
        res.redirect('/login');
});


// Остальные URI => Сообщение со статусом 404 
app.get('*', (req, res) => {
    res.status(404).send('[ERROR] 404: Not Found');
});


app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));