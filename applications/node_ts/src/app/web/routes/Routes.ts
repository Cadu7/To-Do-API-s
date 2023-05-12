import {Router} from 'express'
import {userRoutes} from "./User.routes";
import {toDoListRoutes} from "./ToDoList.routes";
import {securityRoutes} from "./Security.routes";
import {verifyToken} from "../middleware/VerifyToken";
import {toDoItemRoutes} from "./ToDoItems.routes";

export const routes: Router = Router()

routes.use("/session", securityRoutes)
routes.use("/user", userRoutes)
routes.use("/to-do/item", verifyToken, toDoItemRoutes)
routes.use("/to-do", verifyToken, toDoListRoutes)
