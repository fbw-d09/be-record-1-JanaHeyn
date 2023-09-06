const mongoose = require('mongoose');

const { recordSchema } = require('./Record');

const orderSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    artist: { type: String, trim: true },
    quantity: Number,
    records: recordSchema
}, { timestamps: true });

const Order = new mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
