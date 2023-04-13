const express = require('express');
const CustomerController = require('../controllers/customerController.js');


module.exports = () => {
    const controller = new CustomerController();
    const router = express.Router();

    router.get('/', (req, res) => controller.getCustomers(req, res));
    router.get('/:id', (req, res) => controller.getCustomer(res, req.params['id']));
    router.post('/', (req, res) => controller.createCustomer(res, req.body));
    router.put('/', (req, res) => controller.updateCustomer(res, req.body));
    router.delete('/:id', (req, res) => controller.deleteCustomer(res, req.params['id']));

    return router;
}
