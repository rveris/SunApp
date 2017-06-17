var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports.sessionsGetAll = function(req, res){
    var customerId = req.params.customerId;
    console.log("GET all sessions of customerId:", customerId);

    Customer
        .findById(customerId)
        .select('sessions')
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : []
            };
            if (err){
                console.log("Error finding customer")
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = { "message" : "Customer ID not found" + customerId };
            } else {
                response.message = doc.sessions ? doc.sessions : [];
            }
            res
                .status(response.status)
                .json(response.message);
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
            var response = {
                status : 200,
                message : {}
            };
            if (err){
                console.log("Error finding customer")
                response.status = 500;
                response.message = err;
            } else if (!customer) {
                response.status = 404;
                response.message = { "message" : "Customer ID not found" + customerId };
            } else {
                response.message = customer.sessions.id(sessionId);
                if (!response.message) {
                    response.status = 404;
                    response.message = { "message" : "Session ID not found " + sessionId };
                }
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

var _addSession = function(req, res, customer){

    customer.sessions.push({
        date : req.body.date,
        sessionDuration : parseInt(req.body.sessionDuration, 10),
        signature : req.body.signature
    });

    customer.save(function(err, customerUpdated){
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(customerUpdated.sessions[customerUpdated.sessions.length - 1 ]);
        }
    });
};

module.exports.sessionsAddOne = function(req, res){
    var customerId = req.params.customerId;
    console.log("POST session to customerId", customerId);

    Customer
        .findById(customerId)
        .select('sessions')
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : []
            };
            if (err){
                console.log("Error finding customer")
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = { "message" : "Customer ID not found" + customerId };
            } if (doc){
                 _addSession(req, res, doc); 
            } else {
                res
                    status(response.status)
                    .json(response.message);
            }
        });
};

module.exports.sessionsUpdateOne = function(req, res){
    var customerId = req.params.customerId;
    var sessionId = req.params.sessionId;
    console.log("GET sessionsId:", sessionId);

    Customer
        .findById(customerId)
        .select('sessions')
        .exec(function(err, customer) {
            var thisSession;
            var response = {
                status : 200,
                message : {}
            };
            if (err){
                console.log("Error finding customer")
                response.status = 500;
                response.message = err;
            } else if (!customer) {
                response.status = 404;
                response.message = { "message" : "Customer ID not found" + customerId };
            } else {
                thisSession = customer.sessions.id(sessionId);
                if (!thisSession) {
                    response.status = 404;
                    response.message = { "message" : "Session ID not found " + sessionId };
                }
            } 
            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                thisSession.date = req.body.date;
                thisSession.sessionDuration = parseInt(req.body.sessionDuration);
                thisSession.signature = req.body.signature;
                customer.save(function(err, customerUpdated){
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                })
            }
            
        });
};

module.exports.sessionsDeleteOne = function(req, res) {
    var customerId = req.params.customerId;
    var sessionId = req.params.sessionId;
    console.log("GET sessionsId:", sessionId);

    Customer
        .findById(customerId)
        .select('sessions')
        .exec(function(err, customer) {
            var thisSession;
            var response = {
                status : 200,
                message : {}
            };
            if (err){
                console.log("Error finding customer")
                response.status = 500;
                response.message = err;
            } else if (!customer) {
                response.status = 404;
                response.message = { "message" : "Customer ID not found" + customerId };
            } else {
                thisSession = customer.sessions.id(sessionId);
                if (!thisSession) {
                    response.status = 404;
                    response.message = { "message" : "Session ID not found " + sessionId };
                }
            } 
            if (response.status !== 200){
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                customer.sessions.id(sessionId).remove();
                customer.save(function(err, customerUpdated){
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        console.log('Session deleted for customer ', customerId);
                        res
                            .status(204)
                            .json();
                    }
                })
            }
            
        });
};