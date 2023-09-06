const {Record} = require('../models/Record.js');

/** ROUTE ('/records') */
// post
// record erstellen
const createRecord = async(req, res, next) => {
    try{
        const { title, artist, year, price } = req.body;
        const newRecord = new Record({ title, artist, year, price });

        await newRecord.save();
        res.status(201).json({
            success: true,
            message: 'New record created!',
            data: newRecord
        });

    } catch(error) {
        next(error);
    }
};


// get
// alle records anzeigen
const getRecords = async(req, res, next) => {
    try {
        const records = await Record.find();
        res.status(200).json({
            amount: records.length,
            data: records
        });

    } catch(error) {
        console.log({error});
        next(error);
    }
};


/** ROUTE ('/records/:id') */
// get
// bestimmtes record bekommen
// wenn ('/:id') dann auch req.params.id
// wenn ('/:recordId') dann auch req.params.recordId
const getRecord = async(req, res, next) => {
    try {
        const { id } = req.params;
        const record = await Record.findById(id);
        res.status(200).json(record);

    } catch(error) {
        next(error);
    }
};

// put
// bestimmtes record bearbeiten
const updateRecord = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updatedRecord = req.body;

        const record = await Record.findByIdAndUpdate(id, updatedRecord, { new: true });
        res.status(201).json({
            message: 'Record updated!',
            data: record
        });

    } catch(error) {
        next(error);
    }    
};

// delete
// bestimmtes record löschen
const deleteRecord = async(req, res, next) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id, req.body, {next:true});
        res.status(201).json({
            success: true,
            message: 'Record deleted',
            data: record
        });

    } catch(error) {
        next(error);
    }    
};

// delete
// alle records löschen
const deleteRecords = async(req, res, next) => {
    try {
        await Record.deleteMany();
        res.status(201).json({
            success: true,
            message: 'All records deleted!'
        });

    } catch(error) {
        next(error);
    }
};

module.exports = {
    getRecord,
    getRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    deleteRecords
};
