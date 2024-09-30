const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index',{error: req.flash('error'), loggedin : false});
});

router.get('/shop',isLoggedIn,async (req,res)=>{
    let success = req.flash("success")
    let products = await productModel.find()
    res.render('shop',{products,success})
})

router.get('/addtocart/:productId',isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({email : req.user.email});
    user.cart.push(req.params.productId);
    await user.save();
    req.flash("success","product added to cart!");
    res.redirect('/shop');
})

router.get('/cart',isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({email : req.user.email}).populate('cart');
    let totalCost = user.cart.reduce((acc,item)=> (acc+(item.price-item.discount)) ,0) + 20
    res.render('cart',{user,totalCost})
})

module.exports = router;  