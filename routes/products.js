const express = require("express");
const router = express.Router();
const productController = require('../controller/product');
router
.post('/',productController.create)
.put('/:id',productController.replaceIdData)
.patch('/:id',productController.updateIdData)
.get('/',productController.getAll)
.get('/:id',productController.getSingle)
.delete('/:id',productController.delete);

exports.router=router;