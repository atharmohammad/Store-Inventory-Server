const express = require('express');
const router = new express.Router();
const Notes = require('../models/notes')
const auth = require('../middlewares/Auth')

router.get('/notes',auth,async(req,res,next)=>{
    try{
        const notes = await Notes.find({Shop:req.shop._id , Deleted:false})
        return res.status(200).send(notes);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.post('/createNotes',auth,async(req,res,next)=>{
    try{
        const notes = new Notes({
            ...req.body,
            Shop:req.shop
        });

        await notes.save();
        return res.status(200).send(notes);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.delete('/notes/:id',auth,async(req,res,next)=>{
    try{
        const id = req.params.id;
        const notes = await Notes.findOne({_id:id,Deleted:false});
        if(!notes){
            throw Error("Item dont exist");
        }
        notes.Deleted = true;
        await notes.save();
        return res.status(200).send();
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
});

module.exports = router;