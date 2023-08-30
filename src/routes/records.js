const express = require('express');
const router = express.Router();
const {getRecords, getRecord, updateRecord, deleteRecord} = require('../controller/records');

// /api/records
router.route('/')
.get(getRecords);
// .post(createRecord);

// /api/records/idnummer
router.route('/:id')
.get(getRecord)
.put(updateRecord)
.delete(deleteRecord);

module.exports = router;
