import {Request, Response} from "express";
import {container} from "tsyringe";
import {ToDoItemsService} from "../../service/ToDoItemsService";
import {ToDoItemsRequest, ToDoItemsRequestUpdate} from "../../model/ToDoItemsRequest";

export class ToDoItemsController {

  async deleteOneItem(request: Request, response: Response) {

    const {user} = response.locals
    const {toDoId, itemId} = request.params;

    await container.resolve(ToDoItemsService).deleteOneItemFromList(user, toDoId, itemId);

    response.status(200).send();
  }

  async addItems(request: Request, response: Response) {

    const {user} = response.locals
    const {toDoId} = request.params;
    const items = request.body as ToDoItemsRequest[]

    await container.resolve(ToDoItemsService).addItems(user, toDoId, items);

    response.status(200).send();
  }

  async updateItem(request: Request, response: Response) {

    const {user} = response.locals
    const {toDoId, itemId} = request.params;
    const item = request.body as ToDoItemsRequestUpdate

    await container.resolve(ToDoItemsService).updateItem(user, toDoId, itemId, item);

    response.status(200).send();
  }
}