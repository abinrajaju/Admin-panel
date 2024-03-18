const mongoose = require('mongoose')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"need the name"]
    },
    email:{
        type:String,
        required:[true,"need the email"],
        unique:true,
        validate:{
            validator:(value)=>{
                return emailRegex.test(value);
             },
             message:"invalid email formate"
        }
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    },
    password:{
        type:String,
        required:[true,"need password"]
    }
})

const Userdb = mongoose.model('userdb',schema)
module.exports = Userdb