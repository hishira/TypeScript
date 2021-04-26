import {Mongoose, Connection} from "mongoose";

export const ConnectionDatabase = ()=>{
    const uri:string = "mongodb://localhost:27017/ToDo"
    const Mongo: Mongoose = new Mongoose()
    Mongo.connect(uri,{
        useNewUrlParser: true,
        useFindAndModify:true,
        useCreateIndex: true,
    });
    let database: Connection = Mongo.connection;
    database.once("open",()=>console.log("Connect to database"));
    database.once("error",()=>console.log("error while connecting to database"))

}