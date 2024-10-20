const express=require("express");
const app=express();

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const itemsrouter= require('./routers/itemRouter');
app.use('/',itemsrouter)

const personrouter= require('./routers/personRouter')

app.use('/person',personrouter)


app.listen(3000,()=>{console.log("listen on the 3000")})