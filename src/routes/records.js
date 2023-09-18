const express = require('express');
const router = express.Router();
const {getRecords, getRecord, createRecord, updateRecord, deleteRecord} = require('../controller/recordsController.js');

// /api/records
router
    .route('/')
    .get(getRecords)
    .post(createRecord);

// /api/records/idnummer
router  
    .route('/:id')
    .get(
        getRecord)
    .put(updateRecord)
    .delete(deleteRecord);

module.exports = router;
