const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: { type: String, trim: true },
    city: { type: String, trim: true }
});

// const Address = new mongoose.model('Address', addressSchema);

module.exports = addressSchema;
