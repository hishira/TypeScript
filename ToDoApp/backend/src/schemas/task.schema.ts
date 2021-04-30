import { Schema } from "mongoose";

export const TaskSchema = new Schema({
  createDate: {
    type: Date,
    default: new Date(),
  },
  editDate: {
    type: Date,
    default: new Date(),
  },
  content: {
    type: String,
  },
},{collection: "Tasks"});
