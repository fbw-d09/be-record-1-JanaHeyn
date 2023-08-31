const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const Order = require('../models/Order.js');

/** ROUTE ('/orders') */
// get
// alle order anzeigen
exports.getOrders = (req, res, next) => {
    Order
    .find()
    .then(orders => {
        res.status(200).json({
            success: true,
            amount: orders.length,
            data: orders
        })
    }) 
    .catch(err => console.log(err.message))
}


// post
// order erstellen
// exports.createOrder = (req, res, next) => {
    
// }


/** ROUTE ('/orders/:id') */
// get
// einen bestimmten order anzeigen
exports.getOrder = (req, res, next) => {
    const { id } = req.params;

    Order
    .findById(id)
    .then(order => {
        res.status(200).json({
            success: true,
            data: order
        })
    })
    .catch(err => console.log(err.message))
}

// put
// bestimmte order bearbeiten
exports.updateOrder = (req, res, next) => {
    const { id } = req.params;

    Order
    .findByIdAndUpdate(id,
    {
        title: req.body.title,
        artist: req.body.artist,
        quantity: req.body.quantity
        
    },
    {
        new: true
    })
    .then(order => {
        res.status(201).json({
            success: true,
            updated: order !== null ? true : false,
            data: order
        })
    })
    .catch(err => console.log(err.messsage))
}

// delete
// einen bestimmten order löschen
exports.deleteOrder = (req, res, next) => {
    const { id } = req.params;

    Order
    .findByIdAndDelete(id)
    .then(order => {
        res.status(201).json({
            success: true,
            deleted: order !== null ? true : false,
            data: order
        })
    })
    .catch(err => console.log(err.message))
}
