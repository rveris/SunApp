var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports.customersGetAll = function(req, res) {
    console.log("GET all the customers!");
    console.log(req.query);

    var offset = 0;
    var count = 20;
    var maxCount = 50;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    };
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    };

    if (isNaN(offset) || isNaN(count)){
        res
            .status(400)
            .json({
                "message" : "If supplies in querystring offset and count should be numbers."
            });
        return;
    }

    if (count > maxCount){
        res
            .status(400)
            .json({
                "message" : "Count limit of " + maxCount + " exceeded"
            });
        return;
    }

    Customer
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, customers){
            if (err){
                console.log("Error finding customers")
                res
                    .status(500)
                    .json(err);
            } else {
                console.log("Found Customers:", customers.length);
                res
                    .json(customers);
            }            
        });
};

// GET one customer
module.exports.customersGetOne = function(req, res){
    var customerId = req.params.customerId;
    console.log("GET customerId:", customerId);

    Customer
        .findById(customerId)
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding customer")
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = { "message" : "Customer ID not found" + customerId };
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

var _splitArray = function(input){
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
};

// POST new customer
module.exports.customersAddOne = function(req, res){
    
    Customer
        .create({
            name : req.body.name,
            firstName : req.body.firstName,
            idCardNo : req.body.idCardNo,
            nrNo : req.body.nrNo,
            skintype : parseInt(req.body.skintype, 10),
            address : {
                street : req.body.street,
                houseNo : parseInt(req.body.houseNo, 10),
                bus : req.body.bus,
                zipCode : req.body.zipCode,
                location : req.body.location,
                country : req.body.country
            },
            email : req.body.email,
            tel : req.body.tel,
            reason : parseInt(req.body.reason, 10),
            pigment : parseInt(req.body.pigment, 10),
            //skinAnalysis : [{skinDate : req.body.skinDate}],
            sessions : [{
                date : req.body.date,
                sessionDuration : parseInt(req.body.sessionDuration, 10),
                signature : req.body.signature
            }]
        }, function(err, customer){
            if (err){
                console.log("Error creating customer");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log("Customer created", customer);
                res
                    .status(201)
                    .json(customer);
            }
        });


};

module.exports.customersUpdateOne = function(req, res){
    var customerId = req.params.customerId;
    console.log("PUT customerId:", customerId);

    Customer
        .findById(customerId)
        .select("-sessions")
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err){
                console.log("Error finding customer")
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = { "message" : "Customer ID not found" + customerId };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.firstName = req.body.firstName;
                doc.idCardNo = req.body.idCardNo;
                doc.nrNo = req.body.nrNo;
                doc.skintype = parseInt(req.body.skintype, 10);
                doc.address = {
                    street : req.body.street,
                    houseNo : parseInt(req.body.houseNo, 10),
                    bus : req.body.bus,
                    zipCode : req.body.zipCode,
                    location : req.body.location,
                    country : req.body.country
                };
                doc.email = req.body.email;
                doc.tel = req.body.tel;
                doc.reason = parseInt(req.body.reason, 10);
                doc.pigment = parseInt(req.body.pigment, 10);
                //doc.skinAnalysis = [{skinDate : req.body.skinDate}],            
                doc.save(function(err, customerUpdated){
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });
};

module.exports.customersDeleteOne = function(req, res) {
    var customerId = req.params.customerId;

    Customer
        .findByIdAndRemove(customerId)
        .exec(function(err, customer){
            if (err) {
                res
                    .status(404)
                    .json(err)
            } else {
                console.log("Customer deleted, ID: ", customerId);
                res
                    .status(204)
                    .json();
            }
        });
};