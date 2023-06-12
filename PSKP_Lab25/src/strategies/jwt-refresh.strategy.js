import jwt from 'jsonwebtoken'

export function jwtRefreshStrategy(req, res, next) {
    try {
        const token = req.cookies['refreshToken'];

        if (!token) {
            return res.status(401).json({ code: 401, message: '[ERROR] 401: Unauthorized.' });
        }

        const user = jwt.verify(token, process.env['RT_SECRET']);
        req.user = { ...user, token };

        next()
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ code: 401, message: '[ERROR] 401: Invalid token' });
        }

        return res.status(401).json({ code: 401, message: '[ERROR] 401: Unauthorized.' });
    }
}
