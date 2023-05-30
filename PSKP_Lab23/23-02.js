import express from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const prisma = new PrismaClient()
const atSecret = 'my_secret_access_token'
const rtSecret = 'my_secret_refresh_token'
const app = express()
const PORT = 5000;

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }))



async function getTokens(payload) {
    const tokens = {
        accessToken: jwt.sign(payload, atSecret, { expiresIn: '30s' }),
        refreshToken: jwt.sign(payload, rtSecret, { expiresIn: '10d' }),
    }

    await prisma.user.update({
        where: {
            username: payload.username,
        },
        data: {
            rt: tokens.refreshToken,
        },
    })

    return tokens
}



function jwtRefreshStrategy(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')?.[1]

        if (!token) {
            return res.writeHead(401, 'unauthorized').end('unauthorized')
        }

        const user = jwt.verify(token, rtSecret)
        req.user = { ...user, token }

        next()
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.writeHead(401, 'invalid_token').end('invalid token')
        }

        return res.writeHead(401).end('unauthorized')
    }
}



function jwtStrategy(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')?.[1]

        if (!token) {
            return res.writeHead(401, 'unauthorized').end('unauthorized')
        }

        const user = jwt.verify(token, atSecret)
        req.user = user

        next()
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.writeHead(401, 'invalid_token').end('invalid token')
        }

        res.writeHead(401).end('unauthorized')
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
        },
    })

    if (!user) {
        return res.writeHead(401, 'bad_credentials').end('bad credentials')
    }

    const tokens = await getTokens(user)
    res.json(tokens)
})


app.get('/reg', (req, res) => {
    res.sendFile(join(__dirname, './static/registration.html'))
})


app.post('/reg', async (req, res) => {
    let user = await prisma.user.findFirst({
        where: {
            username: req.body.username,
        },
    })

    if (user) {
        return res.writeHead(409).end('conflict')
    }

    user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
        },
        select: {
            username: true,
        },
    })

    const tokens = await getTokens(user)
    res.status(201).json(tokens)
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
    })

    if (!user) {
        return res.writeHead(401, 'invalid_token').end('invalid token')
    }

    const tokens = await getTokens(user)
    res.json(tokens)
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

    res.end('logout')
})


app.get(
    '/resource',
    jwtStrategy,
    (req, res) => {
        res.end(`resource owned by ${req.user.username}`)
    })


app.listen(process.env.PORT || PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));