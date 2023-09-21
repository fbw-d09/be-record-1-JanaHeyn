const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    artist: { type: String, trim: true },
    year: { type: String, required: true },
    price: { type: String, required: true },
}, { timestamps: true });

const Record = new mongoose.model('Record', recordSchema, 'records');

module.exports = { Record, recordSchema };
