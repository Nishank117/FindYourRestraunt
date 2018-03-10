const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        minlength: 1
    }
});
var User = mongoose.model('User',userSchema);

//var newUser = new User({
//    name: 'Nishank',
//    email: 'nishankdas@gmail.com'
//});
//newUser.save().then((doc)=>{
//},(e)=>{
//    console.log('Unable to add User',e);
//});



module.exports = {
    User
}
