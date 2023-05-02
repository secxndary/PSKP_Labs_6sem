const express = require('express');
const app = express();
const port = 5000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());



app.get('/login', (req, res) => {
    // Ввод имени и пароля для аутентифицированного доступа к ресурсу
});

app.get('logout', (req, res) => {
    // Отключить аутентифицированный доступ к ресурсу 
});

app.get('/resource', (req, res) => {
    // Ресурс отправляет сообщение RESOURCE
    // При попытке неаутентифицированного доступа выполняет переадресацию на GET /login 
});

// other URIs => 404 error


app.listen(process.env.PORT || port, () => console.log(`[OK] Server running at localhost:${port}/\n`));