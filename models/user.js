const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema({
email:{
    type: String,
    validate: {
      validator: function(v) {
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'Email is required'],
    unique:true
  },
name:{type:String,min:6,required:[true, 'Name is required']},
username:{type:String,min:6,required:[true, 'Username is required'],unique:true},
password:{type:String,min:6,required:[true, 'Password is required']},
phone:{
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number! enter like 111-111-1111`
    },
    required: [true, 'User phone number required']
  },
  status:{type:String,enum: ['0', '1'],default:'1'},
  birthDate:{type:Date},
  gender:{type:String},
  image:{type:String,default:'https://robohash.org/consequunturautconsequatur.png'},
  created_at:{type:Date,default:Date.now},
  updated_at:{type:Date}
});
exports.User = mongoose.model('user',userSchema);