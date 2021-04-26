import { Document, Model } from "mongoose";
export interface ITask {
  createDate: Date;
  editDate: Date;
  content: String;
}
export interface ITaskDocument extends ITask, Document {}
export interface ITaskModel extends Model<ITaskDocument> {}
