const fs = require("fs");
const path = require("path");
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../public/users.json"), "utf-8")
);
const users = data.users;
exports.getAll = (req, res) => {
  res.json(users);
};
exports.get = (req, res) => {
  const id = +req.params.id;
  const user = users.find((u) => u.id === id);
  if (user !== undefined) {
    res.json(user);
  } else {
    res.json({ status: 0, message: "record not found" });
  }
};
exports.create = (req, res) => {
  users.push(req.body);
  res.json(users);
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
