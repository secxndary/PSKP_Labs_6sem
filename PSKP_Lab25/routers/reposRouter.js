const Router = require('express');
const repoRouter = new Router();
const reposController = require('../controllers/reposController');


repoRouter
    .get('/', reposController.getAllRepos)
    .get('/:id', reposController.getOneRepo)
    .post('/', reposController.createRepo)
    .put('/:id', reposController.updateRepo)
    .delete('/:id', reposController.deleteRepo)
    .get('/:id/commits', reposController.getAllCommitsByRepo)
    .get('/:id/commits/:commitId', reposController.getOneCommitByRepo)
    .post('/:id/commits', reposController.createCommitByRepo)
    .put('/:id/commits/:commitId', reposController.updateCommitByRepo)
    .delete('/:id/commits/:commitId', reposController.deleteCommitByRepo);


module.exports = repoRouter;