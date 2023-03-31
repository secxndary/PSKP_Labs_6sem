const express = require('express');
const AuthorController = require('../controllers/authorController.js');


module.exports = () => {
    const controller = new AuthorController();
    const router = express.Router();

    console.log('router')
    router.get('/', (req, res) => controller.getAuthors(req, res));

    return router;
}
