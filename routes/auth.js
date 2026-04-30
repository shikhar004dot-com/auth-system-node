const express=require('express');
const router=express.Router();
const User=require('../models/User')
const bcrypt=require('bcrypt');
const passport=require('passport');
const Joi = require('joi');

const userValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(5).required(),
    age: Joi.number().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().required(),
    monthlyIncome: Joi.number().required(),
    address: Joi.object({
        location: Joi.string().required()
    })
});

// register
router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',async(req,res)=>{
    const {username, password, age, phoneNumber, gender, monthlyIncome, location}=req.body;
    const hashed=await bcrypt.hash(password,10);
    const user=new User({
        username,
        password:hashed,
        age,
        phoneNumber,
        gender,
        monthlyIncome,
        address:{location}
    });
    await user.save();
    res.redirect('/login');
})

// logine page
router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);
        res.redirect('/login');
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

router.get('/', isLoggedIn, (req, res) => {
    res.render('home', { user: req.user });
});


module.exports=router;


