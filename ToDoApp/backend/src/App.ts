import express, { Request, Response, Express } from "express";
import { ConnectionDatabase } from "./utils/databaseconnection";
const app = express();
const PORT: number = 8080;
export class App {
  private app: Express;
  private PORT: number = 8080;
  constructor() {
    this.app = express();
    this.app.get("/", (req: Request, res: Response) => {
      res.send("well done");
    });
    ConnectionDatabase();
    this.app.listen(this.PORT, () => {
      console.log("App work");
    });
  }
}
