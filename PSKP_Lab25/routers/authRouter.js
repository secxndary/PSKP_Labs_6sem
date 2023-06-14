const Router = require('express');
const authRouter = new Router();
const authController = require('../controllers/authController');

authRouter.get('/', authController.getLoginPage);

authRouter.get('/login', authController.getLoginPage);

authRouter.get('/register', authController.getRegisterPage);

authRouter.post('/login', authController.login);

authRouter.post('/register', authController.register);

authRouter.get('/resource', authController.getResoursePage);

authRouter.get('/refresh-token', authController.refreshToken);

authRouter.get('/logout', authController.logout);

module.exports = authRouter;
