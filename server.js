require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection')
const session = require('express-session')
const nocache = require('nocache');

const app = express();
const port= process.env.PORT||3001 ;
//connectmongo
connectDB()
app.use(nocache())

//set session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

//log req
app.use(morgan('tiny'));

//body
app.use(bodyparser.urlencoded({extended:true}))

//set view
app.set('view engine','ejs')

app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
//load router
app.use('/',require('./server/routes/router'))









app.listen(port,()=>{
    console.log(`serever is running ${port}`);})      