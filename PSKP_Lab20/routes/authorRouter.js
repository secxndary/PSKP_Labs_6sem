import express from 'express';
import AuthorController from '../controllers/authorController.js';


export default () => {
    const controller = new AuthorController();
    const router = express.Router();

    console.log('router')
    router.get('/', () => controller.getAuthors());

    return router;
}