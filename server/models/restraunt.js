const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const geoSchema = new Schema({
  type: {
    type: String,
    default:"Point"
  },
  coordinates: {
      type: [Number],
      index:"2dsphere"
  }
});

var rSchema = new Schema({
    name    : {
        type: String,
        required:[true,'Name field is required']
    },
    opens_at: {
        type : Date,
        default : Date.now
    },
    geometry : {
        type    : geoSchema,
        //required: true
    }
});
var restraunt = mongoose.model('restraunt',rSchema);//is like a constructor now can be used to make objects


//var newR = new restrauntSchema({
//    name : 'MANASWITA COOK',
//    geometry : {"type": "point", "coordinates": [-80, 25.791]}
//});
//newR.save().then((doc)=>{
//    console.log(JSON.stringify(doc,undefined,2));
//},(e)=>{
//    console.log('Unable to Add data',e);
//});



module.exports = {
    restraunt
}
