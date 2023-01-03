import mongoose from "mongoose"
const { Schema } = mongoose

const UpdateSchema = new mongoose.Schema({
    status:{
        type:String,
        enum:['Ready','In Progress','Done','Error', 'Info']
    },
    percent: { 
        type : Number
    },
    task : {
        type : String
    },
    error : {
        type : String
    },
    info : {
        type : String
    }
  
  
   

})



var Update = mongoose.model('Update', UpdateSchema );

export default Update