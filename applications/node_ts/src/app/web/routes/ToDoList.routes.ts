import {Router} from "express";
import {ToDoListController} from "../controller/ToDoListController";

export const toDoListRoutes: Router = Router();

const toDoController = new ToDoListController();

toDoListRoutes.post("/", toDoController.create)
toDoListRoutes.get("/", toDoController.findAll)
toDoListRoutes.get("/:toDoId", toDoController.findOne)
toDoListRoutes.delete("/:toDoId", toDoController.deleteOne)
toDoListRoutes.put("/:toDoId", toDoController.updateOne)