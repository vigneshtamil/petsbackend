const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = require('mongodb').ObjectID;
var schema = new mongoose.Schema({
    name: {
        type: String,
        require:true,
        unique : true,
    },
    recommendationtype: {
        type: String,
    },
    description:{
        type: String,
    },
    location:{
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

var recomentation = new mongoose.model('recomentation', schema);

module.exports = recomentation;
