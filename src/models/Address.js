const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
});

const Address = new mongoose.model('Address', addressSchema, 'addresses');

module.exports = Address;
