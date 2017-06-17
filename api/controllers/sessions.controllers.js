var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports.sessionsGetAll = function(req, res){
    var customerId = req.params.customerId;
    console.log("GET all sessions of customerId:", customerId);

    Customer
        .findById(customerId)
        .select('sessions')
        .exec(function(err, doc) {
            console.log("Returned doc:", doc)
            res
                .status(200)
                .json(doc.sessions);
        });
};

module.exports.sessionsGetOne = function(req, res){
    var customerId = req.params.customerId;
    var sessionId = req.params.sessionId;
    console.log("GET sessionsId:", sessionId);

    Customer
        .findById(customerId)
        .select('sessions')
        .exec(function(err, customer) {
            console.log("Returned doc:", customer)
            var session = customer.sessions.id(sessionId);
            res
                .status(200)
                .json(session);
        });
};