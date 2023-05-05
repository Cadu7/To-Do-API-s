import {Router} from 'express'
import {userRoutes} from "./User.routes";
import {toDoRoutes} from "./ToDo.routes";
import {securityRoutes} from "./Security.routes";
import {verifyToken} from "../middleware/VerifyToken";

export const routes: Router = Router()

routes.use("/session", securityRoutes)
routes.use("/user", userRoutes)
routes.use("/to-do", verifyToken, toDoRoutes)