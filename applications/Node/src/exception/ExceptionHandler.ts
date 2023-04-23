import {InvalidRequest} from "./InvalidRequest";
import {NextFunction, Response, Request} from "express";
import {log} from "../config/Log";
import {messages} from "./messages/Messages";

export const exceptionHandler = (error: Error | InvalidRequest,
                                 _request: Request,
                                 response: Response,
                                 _next: NextFunction) => {

  log.error(`Error on api`, error)

  let body;
  let status;

  if (error instanceof InvalidRequest) {
    status = 400
    body = {message: error.message, error: error.error}
  } else {
    status = 500
    body = {error: messages.UNKNOWN_ERROR, message: error.message}
  }
  response.status(status).json(body)
}