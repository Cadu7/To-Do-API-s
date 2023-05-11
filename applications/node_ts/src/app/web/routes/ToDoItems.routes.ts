import {Router} from "express";
import {ToDoItemsController} from "../controller/ToDoItemsController";

export const toDoItemRoutes: Router = Router();

const toDoController = new ToDoItemsController();

toDoItemRoutes.delete("/:toDoId/:itemId", toDoController.deleteOneItem)
toDoItemRoutes.put("/:toDoId/:itemId", toDoController.updateItem)
toDoItemRoutes.patch("/:toDoId", toDoController.addItems)