import express, { Router } from "express";
import { TaskController } from "../controllers/task.controller";
export class TaskRouter {
  private router: Router;
  private taskController: TaskController;
  constructor() {
    this.router = express.Router();
    this.taskController = new TaskController();
  }
  initializeRoutes(): Router {
    this.router.post("/create", this.taskController.Create);
    this.router.get("/", this.taskController.GetAll);
    this.router.get("/sortasc", this.taskController.SortAsc);
    this.router.get("/sortdesc", this.taskController.SortDesc);
    this.router.delete("/", this.taskController.TaskDelete);
    this.router.delete("/all", this.taskController.DeleteAllTask);
    return this.router;
  }
}
