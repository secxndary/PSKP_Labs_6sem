import { Router } from 'express'
import { authController } from '../controllers/index.js'
import { jwtRefreshStrategy } from '../strategies/jwt-refresh.strategy.js'
import { jwtStrategy } from '../strategies/jwt.strategy.js'

const router = Router();

router.post('/login', function (req, res) {
    authController.login(req, res);
})

router.post('/reg', function (req, res) {
    authController.register(req, res);
})

router.post('/refresh', jwtRefreshStrategy, function (req, res) {
    authController.refresh(req, res);
})

router.post('/logout', jwtStrategy, function (req, res) {
    authController.logout(req, res);
})

router.get('/logout', jwtStrategy, function (req, res) {
    authController.logout(req, res);
})

router.get('/abilities', jwtStrategy, function (req, res) {
    authController.getAbilities(req, res);
})

export default router;
