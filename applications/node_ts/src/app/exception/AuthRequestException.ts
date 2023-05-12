import {BodyException} from "./BodyException";

export class AuthRequestException extends BodyException {

  status: number

  constructor(error: string, message: string, status: number = 401) {
    super(error, message);
    this.status = status;
  }
}