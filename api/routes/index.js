var express = require('express');
var router = express.Router();

var ctrlCustomers = require('../controllers/customers.controllers.js');
var ctrlSessions = require('../controllers/sessions.controllers.js');

// Customers routes
router
    .route('/customers')
    .get(ctrlCustomers.customersGetAll);

router
    .route('/customers/:customerId')
    .get(ctrlCustomers.customersGetOne);

// Sessions routes
router
    .route('/customers/:customerId/sessions')
    .get(ctrlSessions.sessionsGetAll);

router
    .route('/customers/:customerId/sessions/:sessionId')
    .get(ctrlSessions.sessionsGetOne);

module.exports = router;