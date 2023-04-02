const fs = require('fs');
// const path = require('path');
// const index = fs.readFileSync(path.join(__dirname,'../view/index.html'),'utf-8');
const { Product } = require('../models/product');

exports.getAll = async (req, res) => {
  res.json(await Product.find());
};

exports.getSingle = async (req, res) => {
  try {
    const id = req.params.id;
    const prd = await Product.findById(id);
    res.json(prd);
  } catch (error) {
    console.log(error.message);
    res.json({ status: 0, message: "Some exception getting" })
  }

}
exports.create = async (req, res) => {
  try {
    let product = new Product(req.body);
    const id = await product.save();
    res.json({ status: 1, "message": "Insert", id });
  } catch (error) {
    res.status(400).json({ status: 0, message: "Some exception getting",error})
  }

};

exports.replaceIdData = async (req, res) => {
  try {    
  const id = req.params.id;
  const doc = await Product.findOneAndReplace({_id:id},req.body,{new:true});
  res.status(201).json({status:1,message:"Update data successfully! ",doc});
  } catch (error) {
    console.log(error.message);
    res.json({ status: 0, message: "Some exception getting",id});
  }
};
exports.updateIdData = async (req, res) => {
  try {    
    const id = req.params.id;
    const doc = await Product.findOneAndUpdate({_id:id},req.body,{new:true});
    res.status(201).json({status:1,message:"Update data successfully! ",doc});
    } catch (error) {
      console.log(error.message);
      res.json({ status: 0, message: "Some exception getting",id});
    }
};
exports.delete = async (req, res) => {
  const id = req.params.id;
  let product= await Product.deleteMany();
  res.json({ status: 1, message: "record deleted successfuly!", product});
};
