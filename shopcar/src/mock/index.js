const shop = require('./data/data');

module.exports = function (app) {
    app.get('/shop', function(req, res, next) {
        res.send(shop);
    })
}