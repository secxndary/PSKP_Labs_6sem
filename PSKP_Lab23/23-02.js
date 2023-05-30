import express from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'


const atSecret = 'my_secret_access_token'
const rtSecret = 'my_secret_refresh_token'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const prisma = new PrismaClient()
const app = express()
const PORT = 5000;

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }))



async function getTokens(payload) {
    const tokens = {
        accessToken: jwt.sign(payload, atSecret, { expiresIn: '10m' }),
        refreshToken: jwt.sign(payload, rtSecret, { expiresIn: '24h' }),
    }

    await prisma.user.update({
        where: {
            username: payload.username,
        },
        data: {
            rt: tokens.refreshToken,
        },
    })

    return tokens;
}



function jwtRefreshStrategy(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')?.[1];

        if (!token)
            return res.status(401).send('<h2>[ERROR] 401: Unauthorized</h2>');

        const user = jwt.verify(token, rtSecret);
        req.user = { ...user, token };
        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError)
            return res.status(401).send('<h2>[ERROR] 401: Invalid token</h2>');

        return res.status(401).send('<h2>[ERROR] 401: Unauthorized</h2>');
    }
}



function jwtStrategy(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')?.[1];

        if (!token)
            return res.status(401).send('<h2>[ERROR] 401: Unauthorized</h2>');

        const user = jwt.verify(token, atSecret);
        req.user = user;
        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError)
            return res.status(401).send('<h2>[ERROR] 401: Invalid token</h2>');

        return res.status(401).send('<h2>[ERROR] 401: Unauthorized</h2>');
    }
}




app.get('/', (req, res) => { res.redirect('/login'); });

app.get('/login', (req, res) => { res.sendFile(join(__dirname, './static/login.html')); });

app.post('/login', async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            username: req.body.username,
            password: req.body.password,
        },
        select: {
            username: true,
        }
    });

    if (!user) {
        return res.status(401).send('<h2>[ERROR] 401: Invalid credentials</h2>');
    }

    const tokens = await getTokens(user);
    res.status(200).end(JSON.stringify(tokens, null, 4));
})


app.get('/reg', (req, res) => { res.sendFile(join(__dirname, './static/register.html')); })

app.post('/reg', async (req, res) => {
    let user = await prisma.user.findFirst({
        where: {
            username: req.body.username,
        },
    });

    if (user) {
        return res.status(409).send('<h2>[ERROR] 401: Conflict</h2>');
    }

    user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
        },
        select: {
            username: true,
        },
    });

    const tokens = await getTokens(user);
    res.status(201).end(JSON.stringify(tokens, null, 4));
})


app.post('/refresh', jwtRefreshStrategy, async (req, res) => {
    const user = await prisma.user.findFirst({
        where: {
            username: req.user.username,
            rt: req.user.token,
        },
        select: {
            username: true,
        },
    });

    if (!user) {
        return res.status(401).send('<h2>[ERROR] 401: Invalid token</h2>');
    }

    const tokens = await getTokens(user);
    res.status(200).end(JSON.stringify(tokens, null, 4));
})


app.post('/logout', jwtStrategy, async (req, res) => {
    await prisma.user.updateMany({
        where: {
            username: req.user.username,
            rt: {
                not: null,
            },
        },
        data: {
            rt: null,
        },
    })

    res.send('<h2>Logout</h2>');
})


app.get('/resource', jwtStrategy, (req, res) => {
    return res.send(`<h2>Welcome to the resource, ${req.user.username}!</h2>`);
})


app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));