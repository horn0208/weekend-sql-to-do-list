// requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todoRouter = require('./public/modules/todoRouter');

// app uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/todo', todoRouter);

// globals
const port = process.env.PORT || 5001;

// spin up server
app.listen(port, ()=>{
    console.log('server up on:', port);
});