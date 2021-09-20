const validator = require("validator");
const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {   
        Name:{
            type:String,
            trim:true,
            required:true
        },
        Address: {
            type: String,
            trim: true,
            default:"",
        },
        Phone:{
            type:Number,
            default:-1
        },
        Email:{
            type: String,
            trim: true,
            unique: true,
            validate: (value) => {
                if (!validator.isEmail(value)) throw new Error("Email is not valid !");
            },
        },
        Description:{
            type:String,
            trim:true,
            default:"",
        },
        Type:{
            type:String,
            trim:true,
            default:"supplier"
        },
        Shop:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Shop',
            required:true
        }
    }
)

const table = mongoose.model('Contact',schema);
module.exports = table;