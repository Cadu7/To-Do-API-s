import {Request, Response} from "express";
import {container} from "tsyringe";
import {SecurityService} from "../../service/SecurityService";

export class SecurityController {

  async login(request: Request, response: Response) {
    const {username, password} = request.body;

    const token = await container.resolve(SecurityService).login(username, password);

    response.status(200).json({token: token});
  }
}