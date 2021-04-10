const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = require('mongodb').ObjectID;
var schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    breed: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    behaviour: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    certified: {
        type: String,
    },
    vaccinated: {
        type: String,
    },
    kcino: {
        type: String,
    },
    mchipno: {
        type: String,
    },
    description: {
        type: String,
    },
    isdeleted: {
        type: Number,
        default: 0
    },
    isactive: {
        type: Boolean,
        default: true
    },
    createdby:{
        type: ObjectId,
    }
})

schema.plugin(timestamps);

var mypets = new mongoose.model('mypets', schema);

module.exports = mypets;

