const mongoose = require('mongoose');
const {MONGODB_URL} = require('./development.json')
const config = require('config')
const dbgr = require("debug")("development:mongoose");

mongoose
// .connect(`${MONGODB_URL}/bag_shop`)
.connect(`${config.get("MONGODB_URL")}/bag_shop`)
.then(()=>{
    dbgr("connected"); 
})
.catch((err)=>{
    dbgr(err);
});

module.exports = mongoose.connection;