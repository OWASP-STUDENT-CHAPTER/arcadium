const router = require("express").Router();
const Room = require("../model/roomModel");
const Community = require("./model");
const isAuthenticated = require("../middleware/isAuthenticated");
const roomModel = require("../model/roomModel");
const Team = require("../team/model");

router.post('/question/add',(req,res)=>{
    const ques= new Community(
        {
            ...req.body
        }
    )
    ques.save();
    return res.json({msg : "Community Question Added"});
})

router.post('/question/add',(req,res)=>{
    const ques= new Community(
        {
            ...req.body
        }
    )
    ques.save();
    return res.json({msg : "Community Question Added"});
})

router.get('/que',isAuthenticated ,async (req,res)=>{
    const {category} = req.body;
    
})

module.exports= router;