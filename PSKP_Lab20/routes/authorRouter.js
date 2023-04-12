const express = require('express');
const AuthorController = require('../controllers/authorController.js');


module.exports = () => {
    const controller = new AuthorController();
    const router = express.Router();

    router.get('/', (req, res) => controller.getAuthors(req, res));
    router.get('/:id', (req, res) => controller.getAuthor(res, req.params['id']));
    router.post('/', (req, res) => controller.createAuthor(res, req.body));
    router.put('/', (req, res) => controller.updateAuthor(res, req.body));
    router.delete('/:id', (req, res) => controller.deleteAuthor(res, req.params['id']));

    return router;
}
