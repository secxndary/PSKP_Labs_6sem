import { Router } from 'express'

import { commitsController } from '../controllers/index.js'
import { jwtStrategy } from '../strategies/jwt.strategy.js'

const router = Router();

router.get('/:repoId/commits', function(req, res) {
    commitsController.findAll(req, res);
})

router.get('/:repoId/commits/:commitId', jwtStrategy, function(req, res) {
    commitsController.findOne(req, res);
})

router.post('/:repoId/commits', jwtStrategy, function(req, res) {
    commitsController.create(req, res);
})

router.put('/:repoId/commits/:commitId', jwtStrategy, function(req, res) {
    commitsController.update(req, res);
})

router.delete('/:repoId/commits/:commitId', jwtStrategy, function(req, res) {
    commitsController.delete(req, res);
})

export default router;
