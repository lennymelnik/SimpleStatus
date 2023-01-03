import mongoose from "mongoose"
const { Schema } = mongoose

const SystemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name Required"]
    },
    updates:[{
        type : Schema.Types.ObjectId,
        ref : 'Update'
    }],
    lastUpdate : {
        type : Schema.Types.ObjectId,
        ref : 'Update'
    },
  
    user : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
   

})



var System = mongoose.model('System', SystemSchema );

export default System