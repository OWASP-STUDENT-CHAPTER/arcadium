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
    const ques=await Community.find({cat : category})
    const i=Math.floor(Math.random()*ques.length);
    const communityQues=ques[i];
    const room= await Room.findById(req.user.room).populate("teams");
    // const teams = await room.populate("teams");
    console.log(room)
    if(communityQues.type==="move"){
        if(communityQues.place){
            // jail , resort ,party house

        }else if(communityQues.step){
            // move backard or forward

        }
    }else if(communityQues.type==="jail"){
        
    }else if(communityQues.type==="balance"){
        if(communityQues.fromPeers){
            // cut money from everyone
            // give everyone
            let cnt=0;
            for(let i in room.teams){
                const team=room.teams[i];
                if(req.user._id===team._id){
                    break;
                }
                 team.game.money+=balance;
                 team.save();
                 cnt++;
            }
            req.user.game.money+= cnt*balance;  

        }else{
            req.user.game.money+=balance;
            req.user.save();
            // from bank ezzzzzzzzzzzzzz
        }
    }else if(communityQues.type==="freeze"){
        // freeze for time
    }
})

module.exports= router;