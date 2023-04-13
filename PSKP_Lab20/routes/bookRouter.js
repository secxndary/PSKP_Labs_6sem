const express = require('express');
const BookController = require('../controllers/bookController.js');


module.exports = () => {
    const controller = new BookController();
    const router = express.Router();

    router.get('/', (req, res) => controller.getBooks(req, res));
    router.get('/:id', (req, res) => controller.getBook(res, req.params['id']));
    router.post('/', (req, res) => controller.createBook(res, req.body));
    router.put('/', (req, res) => controller.updateBook(res, req.body));
    router.delete('/:id', (req, res) => controller.deleteBook(res, req.params['id']));

    return router;
}
