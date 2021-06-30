import * as mognoose from "mongoose";


const EntrySchema = new mognoose.Schema({
    title:{
        type:String,
        default:"",
    },
    username:{
        type:String,
        default:"",
    },
    password:{
        type: String,
        defaulf: "",
    },
    note:{
        type: String,
        default:"",
    },
    groupid:{
        type: mognoose.Schema.Types.ObjectId,
        default:"",
    }
})

export default EntrySchema;