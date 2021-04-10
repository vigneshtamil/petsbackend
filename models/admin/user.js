const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = require('mongodb').ObjectID;
var schema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    mobilenumber: {
        type: Number,
        require:true,
        unique : true,
    },
    password: {
        type: String,
        require:true
    },
    otp: {
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


})

schema.plugin(timestamps);

var user = new mongoose.model('user', schema);

module.exports = user;
