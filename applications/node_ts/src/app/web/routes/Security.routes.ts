import {Router} from 'express'
import {SecurityController} from "../controller/SecurityController";

export const securityRoutes: Router = Router();

const securityController = new SecurityController();

securityRoutes.post("/login", securityController.login)