const express = require('express');
const router = new express.Router();
const Shop = require('../models/shops');
const auth = require("../middlewares/Auth");

router.post('/login',async(req,res,next)=>{
    try{
        const ShopName = req.body.ShopName;
        const Password = req.body.Password;

        const shop = await Shop.findByCredentials(ShopName,Password);
        await shop.generateToken()

        return res.status(200).send(shop)
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
});

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
