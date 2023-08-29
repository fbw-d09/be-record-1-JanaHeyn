const { Schema, model } = require('mongoose');

const order = new Schema({
    title: String,
    artist: String,
    quantity: Number
}, { timestamps: true });

const orderModel = new model('Order', order, 'orders');

module.exports = orderModel;
