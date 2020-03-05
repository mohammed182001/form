const moongose = require('mongoose');
const userSchema = new moongose.Schema({
    name : {type : String,required :true},
    email : {type : String,required :true},
    tel : {type : String,required :true},
    date : {type : Date,default:Date.now},
});
const User = moongose.model('User' , userSchema);
module.exports = User;