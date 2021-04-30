import express, { Request, Response, Express } from "express";
import { ConnectionDatabase } from "./utils/databaseconnection";
import { TaskRouter } from "./routes/task.route";
import { json } from "body-parser";
import cors from "cors";
const PORT: number = 8080;
export class App {
  private app: Express;
  private PORT: number = 8080;
  private taskRouter: TaskRouter;
  constructor() {
    ConnectionDatabase();
    this.taskRouter = new TaskRouter();
    this.app = express();
    this.app.use(json());
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use("/task", this.taskRouter.initializeRoutes());
    this.app.get("/", (req: Request, res: Response) => {
      res.send("well done");
    });
    this.app.listen(this.PORT, () => {
      console.log("App work");
    });
  }
}
