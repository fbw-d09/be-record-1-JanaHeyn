const express = require('express');
const router = express.Router();
const orderController = require('../controller/orders');

router.route('/') // .../orders
.get(orderController.getOrders)
.post(orderController.createOrder);

router.route('/:id')
.get(orderController.getOrder)
.delete(orderController.deleteOrder);

module.exports = router;
