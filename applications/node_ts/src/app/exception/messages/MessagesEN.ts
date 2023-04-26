import {MessageType} from "./Messages";

export const messagesEN: MessageType = {
  INCORRECT_USER_OR_PASSWORD: "Incorrect user or password",
  PASSWORD_TOO_SHORT: "Password must contain at least 12 characters",
  FIELD_IS_NOT_EMAIL: "The informed email is invalid",
  INVALID_USER_NAME: "The email informed is already registered",
  UNKNOWN_ERROR: "Error unknown",
  FIELD_IS_NOT_UUID: (fieldName: string): string => `The field ${fieldName} is not a valid UUID`,
  FIELD_IS_NULL: (fieldName: string): string => `The field ${fieldName} was not informed in request body`,
  INVALID_OBJECT: "Invalid Object"
}
