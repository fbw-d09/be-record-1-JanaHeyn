const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    quantity: Number,
    record: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    }]
}, { timestamps: true });

const Order = new mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
