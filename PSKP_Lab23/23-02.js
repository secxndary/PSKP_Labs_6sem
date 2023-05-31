import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import redis from 'redis'
import { PrismaClient } from '@prisma/client'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'


const atSecret = 'my_secret_access_token'
const rtSecret = 'my_secret_refresh_token'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const prisma = new PrismaClient();
const app = express();
const redisClient = redis.createClient(
    // { url: 'redis://localhost:6379' }
);
const PORT = 5000;

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





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
        }
    })

    return tokens;
}


function jwtRefreshStrategy(req, res, next) {
    try {
        const token = req.cookies['refreshToken'];
        if (!token)
            return res.status(401).send('<h2>[ERROR] 401: Unauthorized</h2>');

        const user = jwt.verify(token, rtSecret);
        req.user = { ...user, token };
        next();

    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).send('<h2>[ERROR] 401: Invalid token</h2>');
        }
        return res.status(401).send('<h2>[ERROR] 401: Unauthorized</h2>');
    }
}


function jwtStrategy(req, res, next) {
    try {
        const token = req.cookies['accessToken'];
        if (!token)
            return res.status(401).send('<h2>[ERROR] 401: Unauthorized</h2>');

        const user = jwt.verify(token, atSecret);
        req.user = user;
        next();

    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).send('<h2>[ERROR] 401: Invalid token</h2>');
        }

        return res.status(401).send('<h2>[ERROR] 401: Unauthorized</h2>');
    }
}






redisClient.on('error', (err) => { console.log('[ERROR] Redis:', err); });

redisClient.on('connect', () => console.log('[OK] Client connected to Redis.\n'));

redisClient.on('end', () => console.log('[WARN] Client disconnected.\n'));

// redisClient.connect()
//     .then(() => { redisClient.quit(); })
//     .catch(err => console.log(err));

async function addToBlacklist(token) {
    console.log('addToBlacklist')
    // await redisClient.connect();
    redisClient
        .connect()
        .then(() => {
            redisClient.set(token, 'revoked');
        });
    // await client.quit();
}


async function isTokenRevoked(token) {
    // await redisClient.connect();
    return new Promise((resolve, reject) => {
        redisClient
            .connect()
            .then(() => {
                console.log('isTokenRevoked')
                redisClient.get(token, (err, reply) => {
                    if (err) {
                        reject(err);
                        console.log('reject(err);')
                    } else {
                        resolve(reply === 'revoked');
                        console.log('resolve(reply === revoked);')
                    }
                });
                // redisClient.quit();
            })
        // .then(() => {
        //     redisClient.quit();
        // });

    });
}






app.get('/', (req, res) => { res.redirect('/login'); });

app.get('/login', (req, res) => { res.sendFile(join(__dirname, './static/login.html')); });

app.get('/reg', (req, res) => { res.sendFile(join(__dirname, './static/register.html')); });


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

    res.cookie('accessToken', tokens.accessToken);
    res.cookie('refreshToken', tokens.refreshToken);

    // res.status(200).end(JSON.stringify(tokens, null, 4));
    console.log(JSON.stringify(tokens, null, 4));
    res.redirect('/resource');
})



app.post('/reg', async (req, res) => {
    let user = await prisma.user.findFirst({
        where: {
            username: req.body.username,
        },
    });

    if (user) {
        return res.status(409).send(`<h2>[ERROR] 409: THere is already a user with username = ${req.body.username}</h2>`);
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

    res.cookie('accessToken', tokens.accessToken);
    res.cookie('refreshToken', tokens.refreshToken);

    // res.status(201).end(JSON.stringify(tokens, null, 4));
    console.log(JSON.stringify(tokens, null, 4));
    res.redirect('/login');
})



app.get('/refresh-token', jwtRefreshStrategy, async (req, res) => {
    const isRevoked = await isTokenRevoked(req.user.token);
    if (isRevoked)
        return res.status(401).send('<h2>[ERROR] 401: Invalid token</h2>');

    const user = await prisma.user.findFirst({
        where: {
            username: req.user.username,
            rt: req.user.token,
        },
        select: {
            username: true,
        }
    });

    if (!user) {
        return res.status(401).send('<h2>[ERROR] 401: Invalid token</h2>');
    }

    const tokens = await getTokens(user);

    res.cookie('accessToken', tokens.accessToken);
    res.cookie('refreshToken', tokens.refreshToken);

    res.status(200).end(JSON.stringify(tokens, null, 4));
})



app.get('/logout', jwtStrategy, async (req, res) => {
    await redisClient.connect();
    addToBlacklist(req.cookies['refreshToken']);

    await prisma.user.updateMany({
        where: {
            username: req.user.username,
            rt: {
                not: null
            }
        },
        data: {
            rt: null
        }
    })

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login')
})



app.get('/resource', jwtStrategy, (req, res) => {
    return res.send(`<h2>Welcome to the resource, ${req.user.username}!</h2>`);
})



app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/`));