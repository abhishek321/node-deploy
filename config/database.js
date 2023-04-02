const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').
  catch(error => handleError(error));
function handleError(error){
    console.log(error);
}
exports.db=  mongoose;