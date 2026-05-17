import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Username is required']
    },
    age : {
        type : Number,
        required : [true , "Age is required"]
    },
    address : {
        type : String,
        required : [true , "address is required"]
    },
    mobile : {
        type : String,
        required : [true , "mobile is required"]
    },
    email : {
        type : String
    },
    aadharCardNumber : {
        type : Number,
        required : [true , "aadharCardNumber is required"],
        unique : [true , "aadharCardNumber must be unique"]
    },
    password : {
        type : String,
        required : [true , "password is required"]
    },
    role : {
        type : String,
        enum : ['voter' , 'admin'],
        default : 'voter'
    },
    isVoted : {
        type : Boolean,
        default : false
    }
})

const userModel = mongoose.model('users' , userSchema);
export default userModel
