const mongoose = require('mongoose');
const { mongoUri } = require('../config/keys');

mongoose.connect(mongoUri);

mongoose.connection.on('connected',()=>{
    console.log("DATABASE connected.")
});
mongoose.connection.on('error',(error)=>{
    console.log("DATABASE ERROR - ", error)
});