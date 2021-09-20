const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {   
        Name:{
            type:String,
            trim:true,
            required:true
        },
        Date:{
            type:Date,
            default:new Date()
        },
        Amount:{
            type:Number,
            default:0
        },
        Shop:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Shop',
            required:true
        }
    }
)

const table = mongoose.model('Goods',schema);
module.exports = table;