import express, { Router } from 'express';
import serverless from 'serverless-http';
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://myDb:B123456b@cluster0.lgscg6r.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
console.log('mongodb connected')
})
.catch(()=>{
    console.log('failed')
})
const joysUsers = require("./mongodbUsers");
const joysOrders = require("./mongodbOrders");
const cors = require("cors");

const api = express();
api.use(express.json());
api.use(cors());

const router = Router();

router.get("/login",async(req,res)=>{
    
    const {account,password}=req.body

    try{
        const check = await joysUsers.findOne({account:account,password:password})
        if(check){
            res.json({status: 'exist', name: check.firstName, id:check._id})
        }
        else{
            res.json("notexist")
        }
    }
    catch(e){
        res.json("notexist")
    }
})

api.use('/api/', router);

export const handler = serverless(api);