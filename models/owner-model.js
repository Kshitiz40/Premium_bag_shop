const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minlength: 3
    },
    email: String,
    password: String,
    gstin: { 
        type: Number,
         default: 0
    },
    picture: {
        type: String,
        default: "profile.png"
    },
    products: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("owner", ownerSchema);