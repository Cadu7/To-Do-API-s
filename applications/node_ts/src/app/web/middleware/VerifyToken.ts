import {NextFunction, Request, Response} from "express";
import {AuthRequestException} from "../../exception/AuthRequestException";
import {messages} from "../../exception/messages/Messages";
import {container} from "tsyringe";
import {SecurityService} from "../../service/SecurityService";

export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    throw new AuthRequestException(messages.UNAUTHORIZED, messages.MISSING_OR_WRONG_TOKEN)
  }

  const token = authorizationHeader.substring(authorizationHeader.indexOf(" ") + 1)

  let jwt = container.resolve(SecurityService).verifyToken(token);
  response.locals.user = jwt.email;
  next();
}