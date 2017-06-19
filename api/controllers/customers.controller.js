//var customerData = require();

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

    var returnData = customerData.slice(offset, offset + count);

    res.json({ returnData });
};