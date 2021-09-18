const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {   
        name:{
            type:String,
            trim:true,
            required:true
        },
        barcode:{
            type:String,
        },
        description: {
            type: String,
            trim: true,
        },
        quantity:{
            type:Number,
            default:0
        }
    }
)

const table = mongoose.model('Goods',schema);
module.exports = table;