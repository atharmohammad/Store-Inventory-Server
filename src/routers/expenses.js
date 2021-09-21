const express = require('express');
const router = new express.Router();
const Expenses = require('../models/expenses')
const auth = require('../middlewares/Auth')

router.get('/expenses',auth,async(req,res,next)=>{
    try{
        const expenses = await Expenses.find({Shop:req.shop._id , Deleted:false})
        return res.status(200).send(expenses);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.post('/createExpense',auth,async(req,res,next)=>{
    try{
        const expenses = new Expenses({
            ...req.body,
            Shop:req.shop
        });

        await expenses.save();
        return res.status(200).send(expenses);
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
})

router.delete('/expenses/:id',auth,async(req,res,next)=>{
    try{
        const id = req.params.id;
        const expenses = await Expenses.findOne({_id:id,Deleted:false});
        if(!expenses){
            throw Error("Item dont exist");
        }
        expenses.Deleted = true;
        await expenses.save();
        return res.status(200).send();
    }catch(e){
        console.log(e);
        return res.status(400).send(e);
    }
});

module.exports = router;
