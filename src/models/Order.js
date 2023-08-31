const { Schema, model } = require('mongoose');

const order = new Schema({
    title: { type: String, trim: true },
    artist: { type: String, trim: true },
    quantity: Number
}, { timestamps: true });

const orderModel = new model('Order', order, 'orders');

module.exports = orderModel;
