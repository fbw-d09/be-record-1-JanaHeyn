const { Schema, model } = require('mongoose');

const recordSchema = new Schema({
    title: { type: String, trim: true },
    artist: { type: String, trim: true },
    year: Number,
    price: String
}, { timestamps: true });

const Record = new model('Record', recordSchema, 'records');

module.exports = { Record, recordSchema };
