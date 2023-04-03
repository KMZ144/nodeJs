const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require ('jsonwebtoken')
const userModel=require('../models/users');


router.post('/login',async (req,res)=>{
    try{
        const {email,password}=req.body;
        if (!(email&&password)){
            return res.status(400).json({err:"email & password are required"})
        }
        const user=await userModel.findOne({email:email})
        if (user&&await bcrypt.compare(password,user.password)){
            const token=jwt.sign(
                    {user_id:user._id,email},
                    process.env.TOKEN_KEY,
                    {
                        expiresIn:"5h"
                    }
            );
            user.token=token;
            return res.status(200).json({data:user})
        }
        return res.status(400).json({error:"email or password doesn't exist"})
    }
    catch(err){
        return res.send(err);
    }
})


router.post('/register',async (req,res)=>{
    try {
        const {firstName,lastName,email,password,age}=req.body;
        if (!(firstName&&lastName&&email&&age)){
            return res.status(400).json({err:"required fields"})
        }
        const existUser=await userModel.findOne({email:email});
        if (existUser){
            return res.status(400).json({error:"user already exist"});
        }
        
        encPass=await bcrypt.hash(password,10)
        const user=await userModel.create({
            firstName,
            lastName,
            email,
            age,
            password:encPass,
        })
        const token=jwt.sign(
            {user_id:user._id,email},
            process.env.TOKEN_KEY,
            {
                expiresIn:"5h",
            }
        );
        user.token=token
        return res.status(200).json(user)
    }
    catch (err){
        console.log(err)
    }
})


module.exports=router