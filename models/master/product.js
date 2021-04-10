const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = require('mongodb').ObjectID;
var schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    producttype: {
        type: String,
    },
    condition: {
        type: String,
    },
    availability: {
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
    cod: {
        type: String,
    },
    price: {
        type: Number,
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

var product = new mongoose.model('product', schema);

module.exports = product;


