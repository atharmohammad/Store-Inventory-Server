const express = require('express');
const router = new express.Router();
const Shop = require('../models/shops');
const auth = require("../middlewares/Auth");

router.post('/login',async(req,res,next)=>{
    try{
        const UserName = req.body.UserName;
        const Password = req.body.Password;

        const shop = await Shop.findByCredentials(UserName,Password);
        const token = await shop.generateToken()

        return res.status(200).send({shop,token})
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
});

router.post('/signup',async(req,res,next)=>{
    console.log(req.body)
    try{
        const obj = {
            ShopName:req.body.ShopName,
            Owner:req.body.Owner,
            UserName:req.body.Username,
            Password:req.body.Password
        }
        const shop = await Shop.findOne({UserName:req.body.UserName});
        if(shop){
            throw Error("Account already exists!");
        }

        const newShop = new Shop(obj);
        await newShop.save();
        
        return res.status(200).send();

    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.get('/logout',auth,async(req,res,next)=>{
    try{
        req.shop.Token = null;
        await res.shop.save();
        return res.status(200).send();
    }catch(e){
        return res.status(400).send();
    }
});

module.exports = router;
