const express=require('express');
const app=express();
require('dotenv').config();

app.use(express.json());

const authMiddleWare = require('./middlewares/auth.js');

app.listen(process.env.PORT,(err)=>{
    if (!err){
        return console.log("server started");
    }
})

const userRouter=require('./routes/users.js')
const postRouter=require('./routes/posts.js')
const authRouter=require('./routes/auth.js');

// app.use((req,res,next)=>{
//     console.log("middleware");
//     next();
// })

const mongoose=require('mongoose');
mongoose.connect(process.env.DB_URL).catch((err)=>{console.log(err);});


app.use(['/'],authRouter)



app.use(['/users','/user'],authMiddleWare,userRouter)
app.use(['/posts','/post'],authMiddleWare,postRouter)
