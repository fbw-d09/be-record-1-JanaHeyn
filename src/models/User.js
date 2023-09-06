const { Schema, model } = require('mongoose');

const { userProfileSchema } = require('./UserProfile.js');
const { addressSchema } = require('./Address.js');

const userSchema = new Schema({
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true },
    username: { type: String, unique: true, trim: true, required: true },
    birthday: {
        day: Number,
        month: Number,
        year: Number
    },
    role: { type: String, default: 'member' },
    email: String,
    password: String,
    profile: userProfileSchema,
    address: addressSchema

}, { timestamps: true });

const User = new model('User', userSchema, 'users');

module.exports = User;
