const express = require('express');
const router = express.Router();
const {getRecords, getRecord, createRecord, updateRecord, deleteRecord} = require('../controller/recordsController.js');
const authAdmin = require('../middleware/authAdmin.js');
const recordValidtationPost = require('../validations/recordValidationPost.js');
const recordValidtationPut = require('../validations/recordValidationPut.js');

// /api/records
router
    .route('/')
    .get(getRecords)
    .post(
        authAdmin,
        recordValidtationPost.title,
        recordValidtationPost.artist,
        recordValidtationPost.year,
        recordValidtationPost.price,
        createRecord);

// /api/records/idnummer
router  
    .route('/:id')
    .get(
        getRecord)
    .put(
        authAdmin,
        recordValidtationPut.title,
        recordValidtationPut.artist,
        recordValidtationPut.year,
        recordValidtationPut.price,
        updateRecord)
    .delete(
        authAdmin,
        deleteRecord);

module.exports = router;
