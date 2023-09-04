const { Schema, model } = require('mongoose');

const { userProfileSchema } = require('./UserProfile.js');

const user = new Schema({
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    username: { type: String, unique: true, trim: true },
    birthday: {
        day: Number,
        month: Number,
        year: Number
    },
    role: { type: String, default: 'member' },
    email: String,
    password: String,
    profile: userProfileSchema

}, { timestamps: true });

const userModel = new model('User', user, 'users');

module.exports = userModel;
