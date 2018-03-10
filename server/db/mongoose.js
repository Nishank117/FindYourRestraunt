var mongoose = require ('mongoose');
var GeoJSON = require ('mongoose-geojson-schema');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Api');

module.exports = {mongoose};
