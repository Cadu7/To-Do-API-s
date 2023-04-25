import {BodyException} from "./BodyException";

export class InvalidRequestException extends BodyException{

  constructor(error: string, message: string) {
    super(error, message);
  }
}