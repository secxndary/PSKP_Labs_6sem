import express from 'express'
import cookieParser from 'cookie-parser'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import router from './routers/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.get('/login', function (_, res) {
    res.sendFile(join(__dirname, './views/login.html'));
});

app.get('/reg', function (req, res) {
    res.sendFile(join(__dirname, './views/registration.html'));
});


app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));