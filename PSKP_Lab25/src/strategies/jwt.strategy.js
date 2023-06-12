import jwt from 'jsonwebtoken'

export function jwtStrategy(req, res, next) {
    try {
        const token = req.cookies['accessToken'];

        if (!token) {
            return res.status(401).json({ code: 401, message: '[ERROR] 401: Unauthorized.' });
        }

        const user = jwt.verify(token, process.env['AT_SECRET']);
        req.user = user;

        next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ code: 401, message: '[ERROR] 401: Invalid token' });
        }

        return res.status(401).json({ code: 401, message: '[ERROR] 401: Unauthorized.' });
    }
}
