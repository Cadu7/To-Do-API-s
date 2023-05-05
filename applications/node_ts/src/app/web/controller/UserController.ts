import {Request, Response} from "express";
import {container} from "tsyringe"
import {UserService} from "../../service/UserService";

export class UserController {

  async create(request: Request, response: Response) {
    const body = request.body;

    await container.resolve(UserService).createUser(body)

    response.status(201).send();
  }
}