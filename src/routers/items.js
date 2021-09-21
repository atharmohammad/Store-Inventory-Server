const express = require('express');
const router = new express.Router();
const Items = require('../models/items')
const auth = require('../middlewares/Auth')

router.get('/items',auth,async(req,res,next)=>{
    try{
        const items = await Items.find({Shop:req.shop._id , Deleted:false})
        return res.status(200).send(items);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.post('/createItems',auth,async(req,res,next)=>{
    try{
        const items = new Items({
            ...req.body,
            Shop:req.shop
        });

        await items.save();
        return res.status(200).send(items);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.delete('/items/:id',auth,async(req,res,next)=>{
    try{
        const id = req.params.id;
        const items = await Items.findOne({_id:id,Deleted:false});
        if(!items){
            throw Error("Item dont exist");
        }
        items.Deleted = true;
        await items.save();
        return res.status(200).send();
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
});

module.exports = router;
