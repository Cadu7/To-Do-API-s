import {MessageType} from "./Messages";

export const messagesEN: MessageType = {
    INSUFFICIENT_FIELDS: "At least one field must be informed in request",
    TO_DO_ITEM_NOT_FOUND: "To do item was not found",
    CANNOT_PERFORM_THIS_ACTION: "The current user cannot perform this action",
    NOT_FOUND: "Object not found",
    TO_DO_LIST_NOT_FOUND: "To do list was not found",
    CUSTOMER_NOT_FOUND: "The customer that makes the request was not found",
    MISSING_OR_WRONG_TOKEN: "Missing or wrong type of token",
    UNAUTHORIZED: "Unauthorized",
    INCORRECT_USER_OR_PASSWORD: "Incorrect user or password",
    PASSWORD_TOO_SHORT: "Password must contain at least 12 characters",
    FIELD_IS_NOT_EMAIL: "The informed email is invalid",
    INVALID_USER_NAME: "The email informed is already registered",
    UNKNOWN_ERROR: "Error unknown",
    FIELD_IS_NOT_UUID: (fieldName: string): string => `The field ${fieldName} is not a valid UUID`,
    FIELD_IS_NULL: (fieldName: string): string => `The field ${fieldName} was not informed in request body`,
    INVALID_OBJECT: "Invalid Object"
}
