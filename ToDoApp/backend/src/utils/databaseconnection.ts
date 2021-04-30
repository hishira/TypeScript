import mongoose from "mongoose";

export const ConnectionDatabase = () => {
  const uri: string = "mongodb://localhost:27017/ToDo";
  const Mongo: mongoose.Mongoose = new mongoose.Mongoose();
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
  );
  let database: mongoose.Connection = Mongo.connection;
  database.once("open", () => console.log("Connect to database"));
  database.once("error", () =>
    console.log("error while connecting to database")
  );
};
