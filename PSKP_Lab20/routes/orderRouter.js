const express = require('express');
const OrderController = require('../controllers/orderController.js');


module.exports = () => {
    const controller = new OrderController();
    const router = express.Router();

    router.get('/', (req, res) => controller.getOrders(req, res));
    router.get('/:id', (req, res) => controller.getOrder(res, req.params['id']));
    router.post('/', (req, res) => controller.createOrder(res, req.body));
    router.put('/', (req, res) => controller.updateOrder(res, req.body));
    router.delete('/:id', (req, res) => controller.deleteOrder(res, req.params['id']));

    return router;
}
