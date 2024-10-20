const mongooes = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/hotels';



mongooes.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongooes.connection;

db.on('connected',()=>{
    console.log('connected to mongoDB')
});

db.on('error',(err)=>{
    console.error('mongo have error', err)
});

db.on('disconnected',()=>{
    console.log('mongoDB is diconnected')
});

module.exports=db;