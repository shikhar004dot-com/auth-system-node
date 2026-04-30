const express=require('express');
const app=express();
const mongoose=require('mongoose');
const session=require('express-session');
const passport=require('passport');
const path=require('path');
const PORT=8000;


mongoose.connect("mongodb://127.0.0.1:27017/test6");
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)
app.use('/', require('./routes/auth'));

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`);
})