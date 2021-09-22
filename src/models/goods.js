const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {   
        Name:{
            type:String,
            trim:true,
            required:true
        },
        Barcode:{
            type:String,
            default:"",
        },
        Description:{
            type:String,
            trim:true,
            default:"",
        },
        Quantity:{
            type:Number,
            default:0
        },
        Shop:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Shop',
            required:true
        },
        Deleted:{
            type:Boolean,
            default:false
        }
    }
)

const table = mongoose.model('Goods',schema);
module.exports = table;