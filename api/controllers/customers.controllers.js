var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports.customersGetAll = function(req, res) {
    console.log("GET all the customers!");
    console.log(req.query);

    var offset = 0;
    var count = 20;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    };
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    };

    Customer
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, customers){
            console.log("Found Customers:", customers.length);
            res
                .json(customers);
        });
};

module.exports.customersGetOne = function(req, res){
    var customerId = req.params.customerId;
    console.log("GET customerId:", customerId);

    Customer
        .findById(customerId)
        .exec(function(err, doc) {
            res
                .status(200)
                .json(doc);
        });
};