var car = require("./data/car");

module.exports = function(app) {
    app.get("/car", function(req, res, next) {
        res.send(car);
    })
}