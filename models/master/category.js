const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var ObjectId = require('mongodb').ObjectID;
var schema = new mongoose.Schema({
    name: {
        type: String,
        require:true,
        unique : true,
    },
    description: {
        type: String,
    },
    categoryimage:{
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

var category = new mongoose.model('category', schema);

module.exports = category;
