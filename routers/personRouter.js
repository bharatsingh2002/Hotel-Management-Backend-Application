const express = require('express');

const router = express.Router();

const Person= require('./../models/person')

// POST API for the persons

router.post('/',async(req,res)=>{
    try {
        const data = req.body;
        const newPerson= new Person(data);
        const response= await newPerson.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'})
    }
})

// GET API for the persons

router.get('/',async(req,res)=>{
    try {
         const data= await Person.find();
         console.log("Persons are find")
         res.status(200).json(data)
    } catch (error) {
         console.log(error)
         res.status(500).json({error:'Intetrnal server error'})
    }
 
 })

// GET API for the spcific person
 router.get('/:work',async(req,res)=>{
    try {
        const work= req.params.work;
        if(work=='chef' ||  work=='waiter'|| work=='manager'){
            const response= await Person.find({work:work})
            res.status(200).json(response)
        }
        else{
            res.status(404).json({error:'Invalid work'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Intetrnal server error'})
    }
})


// PUT API for update the record in DB


router.put('/:id',async(req,res)=>{
    try {
        const id= req.params.id;
        const updateddata= req.body;

        const response = await Person.findByIdAndUpdate(id,updateddata,{
            new:true,
            runValidators:true
        })
        console.log('Data is updated')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Intetrnal server error'})
    }
})


// DELETE API for the person
router.delete('/:id',async(req,res)=>{
    try {
        const id=req.params.id;

        const response = await Person.findByIdAndDelete(id);
        
        console.log("data deleted");
        res.status(200).json({Message:'Person is deleted'})

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Intetrnal server error'})
    }
})

module.exports=router;
