import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const candidateSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Username is required"]
    },
    party : {
        type : String,
        required : [true , "party is required"]
    },
    age : {
        type : Number,
        required : [true , "Age is required"]
    },
    votes : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users',
                required : true
            },
            votedAt : {
                type : Date,
                default : Date.now()
            }
        }
    ],
    voteCount : {
        type : Number,
        default : 0
    }
})

const candidateModel = mongoose.model('candidates' , candidateSchema)
export default candidateModel