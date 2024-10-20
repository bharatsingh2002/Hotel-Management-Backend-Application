const express = require('express')

const irouter= express.Router();

const Menuitems= require('./../models/Menuitems');
const res = require('express/lib/response');



// POST API for the menuitems
irouter.post('/items',async(req,res)=>{
    try {
        const data = req.body;
        const newPerson= new Menuitems(data);
        const response= await newPerson.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})


// GET API for the menuitems
irouter.get('/items',async(req,res)=>{
   try {
        const data= await Menuitems.find();
        console.log("Items are find")
        res.status(200).json(data)
   } catch (error) {
        console.log(error)
        res.status(500).json({error:'Intetrnal server error'})
   }

})

// GET API for thr taste

irouter.get('/items/:taste',async(req,res)=>{
    try {
        const taste= req.params.taste
        if(taste=='sweet' || taste=='spicy'){
            const response = await Menuitems.find({taste:taste});
            res.status(200).json(response)
        }
        else{
            res.status(404).json({error:'Invalid taste'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Intetrnal server error'})
    }
})

// PUT API for the update data

irouter.put('/items/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const itemdata= req.body;

        const response= await Menuitems.findByIdAndUpdate(id,itemdata,{
            new:true,
            runValidators:true
        })
        console.log("Menu is updated");
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Intetrnal server error'})
    }
})

irouter.delete('/items/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const response = await Menuitems.findByIdAndDelete(id);
        console.log("Data is deleted")
        res.status(200).json({Message:"Data is deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Intetrnal server error'})
    }
})

module.exports=irouter;