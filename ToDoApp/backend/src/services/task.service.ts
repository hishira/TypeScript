import { TaskModel } from "../models/task.model";
import { CreateTaskDTO } from "../dto/createtask.dto";
import { ITaskDocument } from "../models/ITask";

export class TaskService {
  constructor() {}

  async create(newtask: CreateTaskDTO): Promise<ITaskDocument> {
    return await TaskModel.create({ content: newtask.content });
  }

  async getall(): Promise<ITaskDocument[]> {
    return await TaskModel.find({});
  }

  async sortbydateasending(): Promise<ITaskDocument[]> {
    return await TaskModel.aggregate([{ $sort: { createDate: 1 } }]);
  }

  async sortbydatedescending(): Promise<ITaskDocument[]> {
    return await TaskModel.aggregate([{ $sort: { createDate: 1 } }]);
  }
}
