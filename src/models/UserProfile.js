const { Schema, model } = require('mongoose');

const userProfileSchema = new Schema({
    darkmode: Boolean
}, { timestamps:true, id:false });

// const userProfileModel = new model('UserProfile', userProfileSchema, 'userProfiles');

module.exports = userProfileSchema;
