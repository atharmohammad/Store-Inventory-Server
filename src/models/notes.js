const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {   
        Notedata:{
            type:String,
            required:true,
            default:""
        },
        Shop:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Shop',
            required:true
        }
    }
)

const table = mongoose.model('Note',schema);
module.exports = table;