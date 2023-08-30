const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Record = require('../models/Record.js');

/** ROUTE ('/records') */
// get
// alle records anzeigen
exports.getRecords = (req, res, next) => {
    Record
    .find()
    .then(records => {
        res.status(200).json({
            success: true,
            amount: records.length,
            data: records
        })
    })
    .catch(err => console.log(err.message))
}

// post
// record erstellen
// exports.createRecord = (req, res, next) => {
    
// }


/** ROUTE ('/records/:id') */
// get
// bestimmtes record bekommen
// wenn ('/:id') dann auch req.params.id
// wenn ('/:recordId') dann auch req.params.recordId
exports.getRecord = (req, res, next) => {
    // eingegebene recordId
    const { id } = req.params;
    // record.id aus vorhandenem array mit eingegebener recordID vergleichen
    Record
    .findById(id)
    .then(record => {
        res.status(200).json({
            success: true,
            data: record
        })
    })
    .catch(err => console.log(err.message))
}

// put
// bestimmtes record bearbeiten
exports.updateRecord = (req, res, next) => {
    const { id } = req.params;

    Record
    .findByIdAndUpdate(id,
        {
            title: req.body.title,
            artist: req.body.artist,
            year: req.body.year,
            price: req.body.price
        },
        {
            new: true
        })
    .then(record => {
        res.status(201).json({
            success: true,
            updated: record !== null ? true : false,
            data:record
        })
    })
    .catch(err => console.log(err.messsage))
    
}

// delete
// bestimmtes record löschen
exports.deleteRecord = (req, res, next) => {
    const { id } = req.params;

    Record
    .findByIdAndDelete(id)
    .then(record => {
        res.status(201).json({
            success: true,
            deleted: record !== null ? true : false,
            data: record
        })
    })
    .catch(err => console.log(err.message))
    
}
