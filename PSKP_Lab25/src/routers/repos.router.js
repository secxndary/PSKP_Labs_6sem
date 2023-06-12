import { Router } from 'express'
import { reposContorller } from '../controllers/index.js'
import { jwtStrategy } from '../strategies/jwt.strategy.js'

import commitsRouter from './commits.router.js'

const router = Router()

router.get('/', function(req, res) {
    reposContorller.findAll(req, res);
})

router.get('/:id', jwtStrategy, function(req, res) {
    reposContorller.findOne(req, res);
})

router.post('/', jwtStrategy, function(req, res) {
    reposContorller.create(req, res);
})

router.put('/:id', jwtStrategy, function(req, res) {
    reposContorller.update(req, res);
})

router.delete('/:id', jwtStrategy, function(req, res) {
    reposContorller.delete(req, res);
})

router.use(commitsRouter);

export default router;
