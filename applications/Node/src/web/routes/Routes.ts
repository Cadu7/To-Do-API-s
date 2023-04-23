import {Router} from 'express'
import {userRoutes} from "./User.routes";
import {toDoRoutes} from "./ToDo.routes";

export const routes: Router = Router()

routes.use("/user", userRoutes)
routes.use("/to-do", toDoRoutes)