import {InvalidRequestException} from "./InvalidRequestException";
import {NextFunction, Response, Request} from "express";
import {log} from "../config/Log";
import {messages} from "./messages/Messages";
import {AuthRequestException} from "./AuthRequestException";

export const exceptionHandler = (error: Error | InvalidRequestException | AuthRequestException,
                                 _request: Request,
                                 response: Response,
                                 _next: NextFunction) => {

  log.error(`Error on api`, error)

  let body;
  let status;

  if (error instanceof InvalidRequestException) {
    status = error.status
    body = error.getBody()
  } else if (error instanceof AuthRequestException) {
    status = error.status;
    body = error.getBody();
  } else {
    status = 500
    body = {error: messages.UNKNOWN_ERROR, message: error.message}
  }
  response.status(status).json(body)
}