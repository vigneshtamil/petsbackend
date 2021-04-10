const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = require('mongodb').ObjectID;
var schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    eyear: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
     
    },
    city: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    category: {
        type: ObjectId,
    },
    mobileno: {
        type: Number,
    },
    description: {
        type: String,
    },

    fb: {
        type: String,
    },
    instagram: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
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

var addbusiness = new mongoose.model('addbusiness', schema);

module.exports = addbusiness;

