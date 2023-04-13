require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
exports.getAll = async (req, res) => {
  res.json(await User.find());
};
exports.getOne = async (req, res) => {
  const token = req.get('authorization').split('Bearer ')[1];  
  const tokenInfo = jwt.decode(token,process.env.PRIVATE_KEY);
  return res.json({hear:req.get('authorization'),tokenInfo});
  const id = req.params.id;
  const user = await User.findById(id);
  if (user !== undefined) {
    res.json(user);
  } else {
    res.json({ status: 0, message: "record not found" });
  }
};
exports.get = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user !== undefined) {
    res.json(user);
  } else {
    res.json({ status: 0, message: "record not found" });
  }
};
exports.create = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(process.env.PASS_SALT);
    const pass = bcrypt.hashSync(req.body.password, salt);
    const user = new User(req.body);
    user.password = pass;
    let docUser = await user.save();
    const payload = {_id:docUser._id,name:docUser.name,email:docUser.email,status:docUser.status}
    const token= jwt.sign(payload,process.env.PRIVATE_KEY);
    res.json({payload,token});
  } catch (error) {
    res.status(400).json({ status: 0, message: "Some exception getting", error })
  }

};

exports.login = async (req, res) => {
  try {
    if(!req.body.email || !req.body.password){
      return res.status(401).json({status:0,message:"Email and password are required!"});
     }
    const docUser = await User.findOne({email:req.body.email})
    // return res.json(req.body);
    if(docUser===null){
     return res.status(401).json({status:0,message:"Invalid credential"});
    }

    const pass = bcrypt.compareSync(req.body.password, docUser.password);
    if(!pass){
     return res.status(401).json({status:0,message:"Invalid username or password"});
    }
    const payload = {_id:docUser._id,name:docUser.name,email:docUser.email,status:docUser.status}
    const token= jwt.sign(payload,process.env.PRIVATE_KEY);
    res.json({payload,token});
  } catch (error) {
    res.json({ status: 0, message: "Some exception getting", error })
  }

};

exports.replaceIdData = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndReplace({ _id: id }, req.body,{new:true});
    res.status(201).json({status:1,message:"Update data successfully! ",user});
  } catch (error) {
    res.status(400).json({ status: 0, message: "Some exception getting", error })
  }
};
exports.updateIdData = async (req, res) => {

  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id,req.body,{new:true});
    res.status(201).json({status:1,message:"Update data successfully! ",user});
  } catch (error) {
    res.status(400).json({ status: 0, message: "Some exception getting", error })
  }
};
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.json({ status: 1, message: "record deleted successfuly!",user });
  } catch (error) {
    res.status(400).json({ status: 0, message: "Some exception getting", error })
  }
};
