import {BodyException} from "./BodyException";

export class InvalidRequest extends BodyException{

  constructor(error: string, message: string) {
    super(error, message);
  }
}