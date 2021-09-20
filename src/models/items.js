const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {   
        Name:{
            type:String,
            trim:true,
            required:true
        },
        Description:{
            type:String,
            trim:true,
            default:"",
        },
        Handlername:{
            type: String,
            trim: true,
            required:true,
        },
        Cost:{
            type:Number,
            default:0
        },
        Quantity:{
            type:Number,
            default:0
        },
        Type:{
            type:String,
            default:"incoming",
            required:true
        },
        Shop:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Shop',
            required:true
        }
    }
)

const table = mongoose.model('Item',schema);
module.exports = table;