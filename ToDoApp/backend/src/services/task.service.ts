import { TaskModel } from "../models/task.model";
import { CreateTaskDTO } from "../dto/createtask.dto";
import { ITaskDocument } from "../models/ITask";

export class TaskService {
  constructor() {}

  async create(newtask: CreateTaskDTO): Promise<ITaskDocument> {
    return await TaskModel.create({ content: newtask.content });
  }

  async getall(): Promise<ITaskDocument[]> {
    const tasks = await TaskModel.aggregate([
      {
        $project: {
          content: 1,
          createDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createDate",
            },
          },
          editDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$editDate",
            },
          },
        },
      },
    ]);
    return tasks;
  }

  async sortbydateasending(): Promise<ITaskDocument[]> {
    return await TaskModel.aggregate([
      { $sort: { createDate: 1 } },
      {
        $project: {
          content: 1,
          createDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createDate",
            },
          },
        },
      },
    ]);
  }

  async sortbydatedescending(): Promise<ITaskDocument[]> {
    return await TaskModel.aggregate([
      { $sort: { createDate: -1 } },
      {
        $project: {
          content: 1,
          createDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createDate",
            },
          },
        },
      },
    ]);
  }

  async delete(taskid: string): Promise<any> {
    return await TaskModel.findOneAndDelete({ _id: taskid });
  }
  async deleteall():Promise<any>{
    return await TaskModel.deleteMany({})
  }
}
