const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
    title: {type:String,index:true,unique:true,required:true,minLength:[5 , 'Invalid title!'],maxLength:100},
    description: {type:String,required:true,min:[10,'Minimum five char '],max:[100,'Max 20 char ']},
    price: {type:Number,required:true,min:[1,'Enter valid price '],max:[50000,'Do not exceeed amount 50000 ']},
    discountPercentage:String,
    rating: String,    
    brand: {type:String,required:true},
    category: {type:String,required:true},
    thumbnail: {type:String,required:true},
    images: [String],
    date: { type: Date, default: Date.now },
  });
exports.Product = mongoose.model('Product',productSchema);