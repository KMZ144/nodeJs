const express=require('express');
const router=express.Router();
const postModel=require('../models/posts')
router.get('/',async (req,res)=>{
    try{
        const posts=await postModel.find({}).populate('author')
       return res.json(posts)
    }
    catch(err){
        return res.json(err)
    }
})


router.get('/:id',async(req,res)=>{
    const id=req.params.id
    try {
     const post=await postModel.find({_id:id});
     return res.json(post)
 
    }
    catch (err){
     return res.json(err)
 
    }

})

router.post('/',async (req,res)=>{
    try{
        const post=new postModel(req.body);
        await post.save()
        return res.json(post)
    }
    catch(err){
        return res.json(err)
    }
})

router.delete('/:id',async (req,res)=>{
    const id=req.params.id
    try{
        await postModel.deleteOne({_id:id})
        return res.json({status:"delete done"})
    }
    catch(err){
        return res.json(err)
    }

})

router.put('/:id',async (req,res)=>{
    const id=req.params.id
    try{
        await postModel.updateOne({_id:id},{$set :req.body})
        return res.json({status:"update done"})
    }
    catch(err){
        return res.json(err)
    }
})
module.exports = router;