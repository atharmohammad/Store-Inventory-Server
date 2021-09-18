const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {   
        OwnerName:{
            type:String,
            trim:true,
            required:true
        },
        ShopName:{
            type:String,
            trim:true,
            required:true,
            unique:true
        },
        Password: {
            type: String,
            trim: true,
            required:true
        },
    }
)

const table = mongoose.model('Shop',schema);
module.exports = table;