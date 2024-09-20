const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname : {
        type : String,
        trim : true
    },
    email : String,
    password : String,
    gstin : Number,
    picture : String,
    products : {
        type : Array,
        default : []
    }
});

module.exports = mongoose.model("owner",ownerSchema);