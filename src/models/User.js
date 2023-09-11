const mongoose = require('mongoose');

const userProfileSchema = require('./UserProfile.js');
const addressSchema = require('./Address.js');

const userSchema = new mongoose.Schema({
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true },
    username: { type: String, unique: true, trim: true, required: true },
    birthday: { type: String },
    role: { type: String, default: 'member' },
    password: String,
    profile: userProfileSchema,
    address: addressSchema
    // address: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Address'
    // }

}, { timestamps: true });

const User = new mongoose.model('User', userSchema, 'users');

module.exports = User;
