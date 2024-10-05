import {Request, Response} from "express";
import {container} from "tsyringe"
import {UserService} from "../../service/UserService";

export class UserController {
    
    async create(request: Request, response: Response) {
        const {name, email, password} = request.body;
        await container.resolve(UserService).createUser({name, email, password});
        response.status(201).send();
    }
}