const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
exports.getAll = async (req, res) => {
  res.json(await User.find());
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
    const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(req.body.password, salt);
    const user = new User(req.body);
    user.password = pass;
    let docUser = await user.save();
    res.json(docUser);
  } catch (error) {
    res.status(400).json({ status: 0, message: "Some exception getting", error })
  }

};

exports.replaceIdData = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  users.splice(userIndex, 1, { ...req.body, id: id });
  res.status(201).json(users[userIndex]);
};
exports.updateIdData = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  const user = users[userIndex];
  users.splice(userIndex, 1, { ...user, ...req.body });
  res.status(201).json(users[userIndex]);
};
exports.delete = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  users.splice(userIndex, 1);
  res.json({ status: 1, message: "record deleted successfuly!" });
};
