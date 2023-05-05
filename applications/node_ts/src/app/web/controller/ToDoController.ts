import {Request, Response} from "express";
import {container} from "tsyringe";
import {ToDoService} from "../../service/ToDoService";
import {IToDoList} from "../../model/IToDoList";

export class ToDoController {
  async create(request: Request, response: Response) {

    const {user} = response.locals
    const {name, items} = request.body

    await container.resolve(ToDoService).createToDoList(user, name, items);

    response.status(201).send();
  }

  async findAll(request: Request, response: Response) {

    const {user} = response.locals

    const lists: IToDoList[] = await container.resolve(ToDoService).findAllList(user);

    response.status(200).json(lists);
  }

  async findOne(request: Request, response: Response) {

    const {user} = response.locals
    const {toDoId} = request.params;

    const list: IToDoList = await container.resolve(ToDoService).findOneList(user, toDoId);

    response.status(200).json(list);
  }
  async deleteOne(request: Request, response: Response) {

    const {user} = response.locals
    const {toDoId} = request.params;

    await container.resolve(ToDoService).deleteOne(user,toDoId);

    response.status(200).send();
  }




}