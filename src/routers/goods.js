const express = require('express');
const router = new express.Router();
const Goods = requre('../models/goods')
const auth = require('../middlewares/Auth')

router.get('/goods',auth,async(req,res,next)=>{
    try{
        const goods = await Goods.find({Shop:req.shop._id , Deleted:false})
        return res.status(200).send(goods);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.post('/createGoods',auth,async(req,res,next)=>{
    try{
        const goods = new Goods({
            ...req.body,
            Shop:req.shop
        });

        await goods.save();
        return res.status(200).send(goods);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.delete('/goods/:id',auth,async(req,res,next)=>{
    try{
        const id = req.params.id;
        const goods = await Goods.findOne({_id:id,Deleted:false});
        if(!goods){
            throw Error("Item dont exist");
        }
        goods.Deleted = true;
        await goods.save();
        return res.status(200).send();
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
});

