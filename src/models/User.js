const mongoose = require('mongoose');
const crypto = require('crypto');
const secret = process.env.SECRET_TOKEN;
const userProfileSchema = require('./UserProfile.js');
// const {addressSchema, Address} = require('./Address.js');

const userSchema = new mongoose.Schema({
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true },
    username: { type: String, unique: true, trim: true, required: true },
    birthday: { type: String },
    role: { type: String, default: 'member' },
    password: { type: String, required: true },
    profile: userProfileSchema,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }
    // address: {
    //     street: String,
    //     city: String
    // }
    // address: addressSchema

}, { timestamps: true });

// passwort beim anlegen des users verschlüsseln:
userSchema.methods.hashPassword = (password) => {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

// loginpassword mit vorhandenem user passwort abgleichen:
userSchema.methods.comparePassword = function (loginPassword) {
    if(this.password !== this.hashPassword(loginPassword)) {
        return false;
    }

    return true;
}

const User = new mongoose.model('User', userSchema, 'users');

module.exports = User;
