const Order = require('../models/Order.js');

/** ROUTE ('/orders') */
// post
// order erstellen
const createOrder = async(req, res, next) => {
    try {
        const { quantity, record } = req.body;
        const newOrder = new Order({ quantity, record });

        await newOrder.save();
        res.status(201).json({
            success: true,
            message: 'New order created!',
            data: newOrder
        });

    } catch(error) {
        next(error);
    } 
}

// get
// alle order anzeigen
const getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find().populate('record', '-_id -__v');
        res.status(200).json({
            amount: orders.length,
            data: orders
        });

    } catch(error) {
        next(error);
    }
}


/** ROUTE ('/orders/:id') */
// get
// einen bestimmten order anzeigen
const getOrder = async(req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('record', '-_id -__v');
        res.status(200).json(order);

    } catch(error) {
        next(error);
    }
}

// put
// bestimmte order bearbeiten
const updateOrder = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updatedOrder = req.body;

        const order = await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
        res.status(201).json({
            message: 'Order updated!',
            data: order
        });
    } catch(error) {
        next(error);
    }
}

// delete
// einen bestimmten order löschen
const deleteOrder = async(req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);
        res.status(201).json({
            message: 'Order deleted!',
            data: order
        });
    } catch(error) {
        next(error);
    }
}

const deleteOrders = async(req, res, next) => {
    try {
        await Order.deleteMany();
        res.status(201).json({
            success: true,
            message: 'All orders deleted'
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    getOrder,
    getOrders,
    createOrder,
    deleteOrder,
    updateOrder,
    deleteOrders
}
