const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).
  catch(error => handleError(error));
function handleError(error){
    console.log(error);
}
exports.db=  mongoose;