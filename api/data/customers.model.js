var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    street : {
        type : String,
        required : true
    },
    houseNo : {
        type : Number,
        required : true
    },
    bus : {
        type : String,
        required : false
    },
    zipCode : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    }
});

var sessionSchema = new mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    sessionDuration : {
        type : Number,
        required : true,
        min : 5,
        max : 25
    },
    signature : {
        type : String,
        required : true
    }
});

var customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    idCardNo : {
        type : String,
        required : true,
        minlength : 14,
        maxlength : 14
    },
    nrNo : {
        type : String,
        required : true,
        minlength : 15,
        maxlength : 15
    },
    skinType : {
        type : Number,
        required : false
    },
    address : addressSchema,
    email : {
        type : String,
        required : false
    },
    tel : {
        type : String,
        required : false
    },
    reason : {
        type : Number,
        required : true
    },
    pigment : {
        type : Number,
        required : true,
        min : 0,
        max : 1
    },
    skinAnalysis : [{
        type : Date,
        required : false
    }],
    sessions : [sessionSchema]
});

mongoose.model('Customer', customerSchema);