const fs = require('fs');
// const path = require('path');
// const index = fs.readFileSync(path.join(__dirname,'../view/index.html'),'utf-8');
const { Product } = require('../models/product');

exports.getAll = async (req, res) => {
  // res.json(await Product.find());
  res.json([{"id":1,"title":"iPhone 9","description":"An apple mobile which is nothing like apple","price":549,"discountPercentage":12.96,"rating":4.69,"stock":94,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]},{"id":2,"title":"iPhone X","description":"SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...","price":899,"discountPercentage":17.94,"rating":4.44,"stock":34,"brand":"Apple","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/2/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/2/1.jpg","https://i.dummyjson.com/data/products/2/2.jpg","https://i.dummyjson.com/data/products/2/3.jpg","https://i.dummyjson.com/data/products/2/thumbnail.jpg"]},{"id":3,"title":"Samsung Universe 9","description":"Samsung's new variant which goes beyond Galaxy to the Universe","price":1249,"discountPercentage":15.46,"rating":4.09,"stock":36,"brand":"Samsung","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/3/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/3/1.jpg"]},{"id":4,"title":"OPPOF19","description":"OPPO F19 is officially announced on April 2021.","price":280,"discountPercentage":17.91,"rating":4.3,"stock":123,"brand":"OPPO","category":"smartphones","thumbnail":"https://i.dummyjson.com/data/products/4/thumbnail.jpg","images":["https://i.dummyjson.com/data/products/4/1.jpg","https://i.dummyjson.com/data/products/4/2.jpg","https://i.dummyjson.com/data/products/4/3.jpg","https://i.dummyjson.com/data/products/4/4.jpg","https://i.dummyjson.com/data/products/4/thumbnail.jpg"]}])
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
