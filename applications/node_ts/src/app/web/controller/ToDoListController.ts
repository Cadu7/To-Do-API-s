import {Request, Response} from "express";
import {container} from "tsyringe";
import {ToDoListService} from "../../service/ToDoListService";
import {IToDoList} from "../../model/IToDoList";

export class ToDoListController {

  async create(request: Request, response: Response) {

    const {user} = response.locals
    const {name, items} = request.body

    await container.resolve(ToDoListService).createToDoList(user, name, items);

    response.status(201).send();
  }

  async findAll(request: Request, response: Response) {

    const {user} = response.locals

    const lists: IToDoList[] = await container.resolve(ToDoListService).findAllList(user);

    response.status(200).json(lists);
  }

  async findOne(request: Request, response: Response) {

    const {user} = response.locals
    const {toDoId} = request.params;

    const list: IToDoList = await container.resolve(ToDoListService).findOneList(user, toDoId);

    response.status(200).json(list);
  }

  async deleteOne(request: Request, response: Response) {

    const {user} = response.locals
    const {toDoId} = request.params;

    await container.resolve(ToDoListService).deleteOne(user, toDoId);

    response.status(200).send();
  }

  async updateOne(request: Request, response: Response) {

    const {user} = response.locals
    const {toDoId} = request.params;
    const {content} = request.body

    await container.resolve(ToDoListService).updateOne(user, toDoId, content);

    response.status(200).send();
  }

}