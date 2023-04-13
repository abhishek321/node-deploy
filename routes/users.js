const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
router
.post('/',userController.create)
.put('/:id',userController.replaceIdData)
.patch('/:id',userController.updateIdData)
.get('/',userController.getAll)
.post('/login',userController.login)
.get('/one',userController.getOne)
.get('/:id',userController.get)
.delete('/:id',userController.delete)


exports.router = router;