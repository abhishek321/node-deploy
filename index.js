require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
const {db} = require('./config/database');
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
app.use(logger('default'));

app.use('/products',productRouter.router);
app.use('/users',userRouter.router);
app.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,process.env.PUBLIC_DIR,'index.html'));
});
app.listen(4242,(req,res)=>{
    console.log('Server run on http://localhost:4242')
});
