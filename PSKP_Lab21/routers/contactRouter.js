const express = require('express');
const contactRouter = express.Router();
const contactController = require('../controllers/contactController');


contactRouter.get('/', contactController.getAllContacts);
contactRouter.get('/id', contactController.getContact);

contactRouter.get('/add', contactController.addContactView);
contactRouter.post('/add', contactController.addContact);

contactRouter.get('/update', contactController.editContactView);
contactRouter.post('/update', contactController.editContact);

contactRouter.post('/delete', contactController.deleteContact);

module.exports = contactRouter;