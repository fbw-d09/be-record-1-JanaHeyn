const express = require('express');
const router = express.Router();
const {getOrders, getOrder,createOrder, updateOrder, deleteOrder} = require('../controller/ordersController.js');

// /api/orders
router
    .route('/')
    .get(getOrders)
    .post(createOrder);

router
    .route('/:id')
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder);

module.exports = router;
