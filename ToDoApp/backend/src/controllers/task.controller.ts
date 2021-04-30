import { Request, Response } from "express";
import { CreateTaskDTO } from "../dto/createtask.dto";
import { ITaskDocument } from "../models/ITask";
import { TaskService } from "../services/task.service";
let taskservice:TaskService = new TaskService();
export class TaskController {
  
  constructor() {
  }

  async Create(req: Request<{}, {}, CreateTaskDTO>, res: Response) {
    try {
      const taskResponse: ITaskDocument = await taskservice.create(
        req.body
      );
      return res.status(200).json(taskResponse);
    } catch (e) {
      console.log(e);
      return res.status(505).send({ message: "Error" });
    }
  }

  async GetAll(req: Request, resp: Response) {
    try {
      const alltasks: ITaskDocument[] = await taskservice.getall();
      return resp.status(200).json(alltasks);
    } catch (e) {
      console.log(e);
      return resp.status(505).json({ message: "Error" });
    }
  }

  async SortAsc(req: Request, resp: Response) {
    try {
      const sortedtaskasc = await taskservice.sortbydateasending();
      return resp.status(200).json(sortedtaskasc);
    } catch (e) {
      return resp.status(505).send({ error: "Error" });
    }
  }

  async SortDesc(req: Request, resp: Response) {
    try {
      const sortedtaskdesc = await taskservice.sortbydatedescending();
      return resp.status(200).json(sortedtaskdesc);
    } catch (e) {
      return resp.status(505).send({ error: "Error" });
    }
  }
}
