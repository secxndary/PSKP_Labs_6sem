import express from 'express'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import { Strategy } from 'passport-github2'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) { done(null, user); });
passport.deserializeUser(function (user, done) { done(null, user); });
dotenv.config();


passport.use(
    new Strategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://127.0.0.1:5000/auth/github/callback',
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                const user = await prisma.user.upsert({
                    where: {
                        id: profile.id,
                    },
                    update: {},
                    create: {
                        id: profile.id,
                        username: profile.username,
                    },
                });
                done(null, user);
            } catch (e) {
                return done(e, null);
            }
        }
    )
)


app.get('/login', function (req, res) {
    res.sendFile(join(__dirname, './views/login.html'));
})


app.get(
    '/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);


app.get(
    '/auth/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login',
        successRedirect: '/resource',
    })
);


app.get('/logout', function (req, res) {
    req.logout(function () {
        res.redirect('/login')
    })
});


app.get('/resource', function (req, res) {
    if (req.isAuthenticated())
        return res.send(`<h2>Welcome to the resource, ${req.user.username}!</h2>`);
    return res.status(401).end('[ERROR] 401: Unauthorized.');
});


app.listen(PORT, () => console.log(`[OK] Server running at localhost:${PORT}/\n`));