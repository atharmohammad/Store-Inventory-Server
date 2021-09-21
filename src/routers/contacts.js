const express = require('express');
const router = new express.Router();
const Contacts = requre('../models/contacts')
const auth = require('../middlewares/Auth')

router.get('/contacts',auth,async(req,res,next)=>{
    try{
        const contacts = await Contacts.find({Shop:req.shop._id , Deleted:false})
        return res.status(200).send(contacts);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.post('/createContact',auth,async(req,res,next)=>{
    try{
        const contacts = new Contacts({
            ...req.body,
            Shop:req.shop
        });

        await contacts.save();
        return res.status(200).send(contacts);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.delete('/contacts/:id',auth,async(req,res,next)=>{
    try{
        const id = req.params.id;
        const contacts = await Contacts.findOne({_id:id,Deleted:false});
        if(!contacts){
            throw Error("Item dont exist");
        }
        contacts.Deleted = true;
        await contacts.save();
        return res.status(200).send();
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
});

