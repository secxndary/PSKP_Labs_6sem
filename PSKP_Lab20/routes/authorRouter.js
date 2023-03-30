const express = require('express');
const AuthorController = require('../controllers/authorController.js');


module.exports = (req, res) => {
    const controller = new AuthorController();
    const router = express.Router();

    console.log('router')
    router.get('/', (req, res) => controller.getAuthors(req, res).then(res => console.log(res)));

    return router;
}