const express = require('express');
const router = express.Router();
const recordController = require('../controller/records');

router.route('/')
.get(recordController.getRecords)
.post(recordController.createRecord);

router.route('/:id')
.get(recordController.getRecord)
.put(recordController.updateRecord)
.delete(recordController.deleteRecord);

module.exports = router;
