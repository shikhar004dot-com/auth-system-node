const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    age:{
        type: Number,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
    },
    monthlyIncome:{
        type:String,
        required:true
    },
     address:{
        location:{
            type: String
        }
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('User',userSchema);