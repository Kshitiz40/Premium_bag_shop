const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const cookieParser = require('cookie-parser');
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser =async (req, res) => {
    try {
        let { email, fullname, password } = req.body;

        let checkUser = await userModel.findOne({ email: email })
        if (checkUser) {
            req.flash("error","user already exists!");
            return res.redirect('/');
        }

        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                let user = await userModel.create({ email, fullname, password: hash })
                let token = generateToken(user)
                res.cookie("token", token);
                res.redirect("/shop")
            })
        });
    }
    catch (error) {
        res.send(error.message);
    }
}

module.exports.loginUser = async (req,res)=>{
    try{
        let {email,password} = req.body;

        let user = await userModel.findOne({email})
        if(!user) return res.status(400).send("something went wrong");
        bcryptjs.compare(password,user.password,(err,result)=>{
            if(!result){
                return res.send("something went wrong");
            }
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect('/shop')
        })
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports.logout = (req,res)=>{
    res.cookie("token","");
    res.redirect('/')
}