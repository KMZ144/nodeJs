const express=require('express');
const router=express.Router();

const userModel=require('../models/users')

router.get('/',async (req,res)=>{
    try{
    const users=await userModel.find({});
    return res.json(users)
    }
    catch(err){
        return res.json(err)
    }

})

router.get('/:id',async (req,res)=>{
    const id=req.params.id
   try {
    const user=await userModel.find({_id:id});
    return res.json(user)

   }
   catch (err){
    return res.json(err)

   }

})

router.post('/',async (req, res) => {
    try {
    const user= new userModel(req.body)
    await user.save();
    return res.json(user);
    } catch (err) {
        res.send(err);
    }
})

router.delete('/:id',async (req,res)=>{
    const id=req.params.id
    try{
        await userModel.deleteOne({_id:id})
        return res.json({status:"delete done"})
    }
    catch(err){
        return res.json(err)
    }
    

})

router.put('/:id',async (req,res)=>{
    const id=req.params.id
    try{
        await userModel.updateOne({_id:id},{$set :req.body})
        return res.json({status:"update done"})
    }
    catch(err){
        return res.json(err)
    }

})
module.exports = router;
