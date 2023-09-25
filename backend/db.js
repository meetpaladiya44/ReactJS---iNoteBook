const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected Successfully");
    })
}

module.exports = connectMongo;