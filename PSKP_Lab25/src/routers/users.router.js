import { Router } from 'express'
import { usersController } from '../controllers/index.js'
import { jwtStrategy } from '../strategies/jwt.strategy.js'

const router = Router();

router.get('/', jwtStrategy, function(req, res) {
    usersController.findAll(req, res);
})

router.get('/:id', jwtStrategy, function(req, res) {
    usersController.findOne(req, res);
})

export default router;
