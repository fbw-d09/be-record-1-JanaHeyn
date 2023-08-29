let orders = []


/** ROUTE ('/orders') */
// get
// alle order anzeigen
exports.getOrders = (req, res, next) => {
    if(orders.length !== 0) {
        res.status(200).json({
            message: 'Liste aller Bestellungen',
            orders: orders
        });
    } else {
        res.status(404).json({
            message: 'Noch keine Bestellungen vorhanden'
        })
    }
}


// post
// order erstellen
exports.createOrder = (req, res, next) => {
    const newOrder = {
        id: req.body.id,
        title: req.body.title,
        artist: req.body.artist,
        quantity: req.body.quantity
    }
    orders.push(newOrder);
    res.status(201).json({
        message: 'Bestellung erfolgreich erstellt',
        order: newOrder
    });
}


/** ROUTE ('/orders/:id') */
// get
// einen bestimmten order anzeigen
exports.getOrder = (req, res, next) => {
    const orderId = req.params.id;
    const order = orders.find(order => order.id === orderId);
    if(order) {
        res.status(200).json({
            message: 'Bestelldetails',
            id: orderId,
            title: req.body.title,
            artist: req.body.artist,
            quantity: req.body.quantity 
        })
    } else {
        res.status(404).json({
            message: 'Bestellnummer nicht vorhanden'
        })
    }
}


// delete
// einen bestimmten order löschen
exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.id;
    const order = orders.find(order => order.id === orderId);
    if(order) {
        orders = orders.filter(order => order.id !== orderId)
        res.status(200).json({
            message: 'Order wurde erfolgreich gelöscht',
            Bestellung: order
        })
    } else {
        res.status(404).json({
            message: 'Order nicht vorhanden'
        })
    }
}
