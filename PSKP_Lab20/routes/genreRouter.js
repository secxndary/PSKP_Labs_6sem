const express = require('express');
const GenreController = require('../controllers/genreController.js');


module.exports = () => {
    const controller = new GenreController();
    const router = express.Router();

    router.get('/', (req, res) => controller.getGenres(req, res));
    router.get('/:id', (req, res) => controller.getGenre(res, req.params['id']));
    router.post('/', (req, res) => controller.createGenre(res, req.body));
    router.put('/', (req, res) => controller.updateGenre(res, req.body));
    router.delete('/:id', (req, res) => controller.deleteGenre(res, req.params['id']));

    return router;
}
