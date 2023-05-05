import {Router} from "express";
import {ToDoController} from "../controller/ToDoController";

export const toDoRoutes: Router = Router();

const toDoController = new ToDoController();

toDoRoutes.post("/", toDoController.create)
toDoRoutes.get("/", toDoController.findAll)
toDoRoutes.get("/:toDoId", toDoController.findOne)
toDoRoutes.delete("/:toDoId", toDoController.deleteOne)