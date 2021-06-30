import {model} from "mongoose";
import {ITaskDocument} from "./ITask"
import {TaskSchema} from "../schemas/task.schema";

export const TaskModel = model<ITaskDocument>("task",TaskSchema);