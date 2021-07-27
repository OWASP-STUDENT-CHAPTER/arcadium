const mongoose = require('mongoose');
const {eventDB, commonDB } = require('../init/db');

const quesSchema= mongoose.Schema({
    Type :{
        type : String,
        required : true,
        enum : [ "move" , "jail" , "balance" , "freeze" ]
    },
    body : {
        type : String,
        required : true
    },
    place :{
        type : String
    },
    pos :{
        type:Number
    },
    step :{
        type : Number
    },
    cat : {
        type : String,
        enum:["uno","chance"]
    },
    money : {
        type : Number
    },
    fromPeers : {
        type : Boolean,
    },
    time: {
        type : Number
    }
})

const Community =eventDB.model('community',quesSchema);

module.exports= Community;