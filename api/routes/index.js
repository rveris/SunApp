var express = require('express');
var router = express.Router();

var ctrlCustomers = require('../controllers/customers.controllers.js');
var ctrlSessions = require('../controllers/sessions.controllers.js');

// Customers routes
router
    .route('/customers')
    .get(ctrlCustomers.customersGetAll)
    .post(ctrlCustomers.customersAddOne);

router
    .route('/customers/:customerId')
    .get(ctrlCustomers.customersGetOne)
    .put(ctrlCustomers.customersUpdateOne)
    .delete(ctrlCustomers.customersDeleteOne);

// Sessions routes
router
    .route('/customers/:customerId/sessions')
    .get(ctrlSessions.sessionsGetAll)
    .post(ctrlSessions.sessionsAddOne);

router
    .route('/customers/:customerId/sessions/:sessionId')
    .get(ctrlSessions.sessionsGetOne)
    .put(ctrlSessions.sessionsUpdateOne)
    .delete(ctrlSessions.sessionsDeleteOne);

module.exports = router;