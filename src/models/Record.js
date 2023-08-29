const { Schema, model } = require('mongoose');

const record = new Schema({
    title: String,
    artist: String,
    year: Number,
    price: Number
}, { timestamps: true });

const recordModel = new model('Record', record, 'records');

module.exports = recordModel;
