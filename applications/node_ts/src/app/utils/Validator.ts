import {validate} from "uuid"
import {messages} from "../exception/messages/Messages";
import {InvalidRequestException} from "../exception/InvalidRequestException";
import {env} from "../config/Env";

export const validateField = (
  field: any,
  fieldName: string,
  ...validators: Array<(field: any, fieldName: string) => void>): void => {

  for (let validator of validators) {
    validator(field, fieldName);
  }
}

export const checkIsNull = (field: any, fieldName: string): void => {
  if (!field) {
    throw new InvalidRequestException(messages.INVALID_OBJECT, messages.FIELD_IS_NULL(fieldName));
  }
}
export const checkIsEmpty = (field: any, fieldName: string): void => {
  if ((field instanceof String || typeof field == 'string') && field.trim().length == 0) {
    throw new InvalidRequestException(messages.INVALID_OBJECT, messages.FIELD_IS_NULL(fieldName));
  }
}
export const checkIsEmptyList = (field: any[], fieldName: string): void => {
  if (field == null || field.length == 0) {
    throw new InvalidRequestException(messages.INVALID_OBJECT, messages.FIELD_IS_NULL(fieldName));
  }
}

export const checkIsUUID = (field: any, fieldName: string): void => {
  if (!validate(field)) {
    throw new InvalidRequestException(messages.INVALID_OBJECT, messages.FIELD_IS_NOT_UUID(fieldName));
  }
}

export const checkIsEmail = (field: any, _fieldName: string): void => {
  if (!field.match(env.application.emailRegex)) {
    throw new InvalidRequestException(messages.INVALID_OBJECT, messages.FIELD_IS_NOT_EMAIL);
  }
}
