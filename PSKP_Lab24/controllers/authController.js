const { UsersCASL } = require('../models');
const jwt = require('jsonwebtoken');
const refreshKey = 'kir';
let oldRefreshKeyCount = 0;
const accessKey = 'kir';
const redis = require('redis');
const config = require('../config/options.json');

class AbilityController {
    getLoginPage(request, response) {
        response.sendFile(
            __dirname.replace(__dirname.split('\\').pop(), '') +
            'static/html/login.html'
        );
    }

    getRegisterPage(request, response) {
        response.sendFile(
            __dirname.replace(__dirname.split('\\').pop(), '') +
            'static/html/register.html'
        );
    }

    getResoursePage(request, response) {
        if (request.payload && request.payload.id !== 0) {
            response
                .status(200)
                .send(
                    `Resource ${request.payload.id}-${request.payload.username}-${request.payload.role}`
                );
        } else {
            response.status(401).send('Non authorized');
        }
    }

    refreshToken(request, response) {
        if (request.cookies.refreshToken) {
            jwt.verify(
                request.cookies.refreshToken,
                refreshKey,
                async (err, payload) => {
                    if (err) {
                        console.log(err.message);
                    } else if (payload) {
                        client.on('ready', () => console.log('ready'));
                        client.on('error', (err) => console.log(`error: ${err}`));
                        client.on('connect', () => console.log('connect'));
                        client.on('end', () => console.log('end'));
                        client.set(oldRefreshKeyCount, request.cookies.refreshToken, () =>
                            console.log('set old refresh token')
                        );
                        client.get(oldRefreshKeyCount, (err, result) =>
                            console.log('added old refresh token:', result)
                        );
                        oldRefreshKeyCount++;
                        client.quit();
                        const candidate = await UsersCASL.findOne({
                            where: {
                                id: payload.id,
                            },
                        });
                        const newAccessToken = jwt.sign(
                            {
                                id: candidate.id,
                                username: candidate.username,
                                role: candidate.role,
                            },
                            accessKey,
                            { expiresIn: 200 * 60 }
                        );
                        const newRefreshToken = jwt.sign(
                            {
                                id: candidate.id,
                                username: candidate.username,
                                role: candidate.role,
                            },
                            refreshKey,
                            { expiresIn: 24 * 60 * 60 }
                        );
                        response.cookie('accessToken', newAccessToken, {
                            httpOnly: true,
                            sameSite: 'strict',
                        });
                        response.cookie('refreshToken', newRefreshToken, {
                            path: '/refresh-token',
                        });
                        response.redirect('/resource');
                    }
                }
            );
        } else {
            response.status(401).send('Please, authorize');
        }
    }

    logout(request, response) {
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');
        response.redirect('/login');
    }

    async login(request, response) {
        const candidate = await UsersCASL.findOne({
            where: {
                username: request.body.username,
                password: request.body.password,
            },
        });
        if (candidate) {
            const accessToken = jwt.sign(
                {
                    id: candidate.id,
                    username: candidate.username,
                    role: candidate.role,
                },
                accessKey,
                { expiresIn: 10 * 60 }
            );

            const refreshToken = jwt.sign(
                {
                    id: candidate.id,
                    username: candidate.username,
                    role: candidate.role,
                },
                refreshKey,
                { expiresIn: 24 * 60 * 60 }
            );
            response.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'strict',
            });
            response.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'strict',
            });
            response.redirect('/resource');
        } else {
            response.redirect('/login');
        }
    }

    async register(request, response) {
        const candidate = await UsersCASL.findOne({
            where: {
                username: request.body.username,
            },
        });
        if (candidate) {
            response.redirect('/register');
        } else {
            await UsersCASL.create({
                username: request.body.username,
                email: request.body.email,
                password: request.body.password,
                role: request.body.role,
            });
            response.redirect('/login');
        }
    }
}

module.exports = new AbilityController();
