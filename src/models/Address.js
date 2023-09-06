const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
    street: String,
    city: String
});

const Address = new model('Address', addressSchema, 'addresses');

module.exports = {Address, addressSchema};
