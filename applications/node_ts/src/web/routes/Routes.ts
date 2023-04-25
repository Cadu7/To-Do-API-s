import {Router} from 'express'
import {userRoutes} from "./User.routes";
import {toDoRoutes} from "./ToDo.routes";
import {securityRoutes} from "./Security.routes";

export const routes: Router = Router()

routes.use("/session", securityRoutes)
routes.use("/user", userRoutes)
routes.use("/to-do", toDoRoutes)