import {Router} from "express";
import {UserController} from "../controller/UserController";

export const userRoutes: Router = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);