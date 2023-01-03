import mongoose from "mongoose"
const { Schema } = mongoose
 

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email required"]
    },
    password:{
        type:String,
        required:[true, "password required"]
    },
  
    systems : [{
        type : Schema.Types.ObjectId,
        ref : 'System'
    }],
   
    
})



var User = mongoose.model('User', UserSchema );

export default User
