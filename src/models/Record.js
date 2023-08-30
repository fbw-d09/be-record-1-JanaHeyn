const { Schema, model } = require('mongoose');

const record = new Schema({
    title: { type: String, trim: true },
    artist: { type: String, trim: true },
    year: Number,
    price: Number
}, { timestamps: true });

const recordModel = new model('Record', record, 'records');

module.exports = recordModel;
