const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {   
        Name:{
            type:String,
            trim:true,
            required:true,
        },
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
        Token:{
            type:String,
        }
    }
)

schema.methods.toJSON = function(){ //this toJSON is a special function
    //whenever any user object is send on request it will transfrom to JSON.stringify()
    //this toJSON decides what to give back to stringify
  const shop = this;
  const shopObject = shop.toObject();

  delete shopObject.Password;
  delete shopObject.Token;

  return shopObject;
}

schema.methods.generateToken = async function(){
    const shop = this;
    const token = jwt.sign({_id : shop._id.toString()},process.env.JWT_SECRET);
    shop.Token = token
    await shop.save();
    console.log(token)
    return token;
}

schema.statics.findByCredentials = async function(ShopName,Password){
    const shop = await this.model('Shop').findOne({ShopName:ShopName});
    if(!shop){
      throw new Error ('store not found!');
    }
  
    const isMatch = await bcrypt.compare(Password,shop.Password);
  
    if(!isMatch){
      throw new Error('Store Name and password not matched');
    }
  
    return shop
  
  }

schema.pre('save',async function(next){
    const shop = this;
    if(shop.isModified('Password')){
      shop.password = await bcrypt.hash(shop.password,8);
    }
    next();
})

const table = mongoose.model('Shop',schema);
module.exports = table;