require('dotenv').config();

const crypto = require('crypto');

const { Schema, model } = require('mongoose');

const { userProfileSchema } = require('./UserProfile');

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
    profile: userProfileSchema
    // password: { type: String, required: true }

}, { timestamps: true })
.post('save', (doc) => console.log(doc));

user.methods.hashPassword = (password) =>
{
    const secret = process.env.SECRET_KEY;

    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');

    return hash;
}

const userModel = new model('User', user, 'users');

module.exports = userModel;
