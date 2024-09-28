const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('index',{error: req.flash('error')});
});

router.get('/shop',isLoggedIn,(req,res)=>{
    res.send("you can enter!")
})

module.exports = router;  