// in GetAll
if(req.query && req.query.lat && req.query.lng){
    runGeoQuery(req, res);
    return;
};


// method
var runGeoQuery = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    var point = {
        type : "point",
        coordinates : {lat, lng}
    };

    var geoOptions = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };

    Customer
        .geoNear(point, geoOptions, function(err, results, stats){
            console.log('Geo results', results);
            console.log('Geo stats', stats);
            res
                .status(200)
                .json(results);
        });
};