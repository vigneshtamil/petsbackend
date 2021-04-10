const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = require('mongodb').ObjectID;
var schema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    venue: {
        type: String,
    },
    description: {
        type: String,
    },
    eventstartdt: {
        type: Date,
    },
    eventenddt: {
        type: Date,
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
    eventstime: {
        type: String,
    },
    eventetime: {
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

var event = new mongoose.model('event', schema);

module.exports = event;

