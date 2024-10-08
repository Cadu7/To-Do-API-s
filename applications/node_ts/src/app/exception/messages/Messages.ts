import {env} from "../../config/Env";
import {messagesPT} from "./MessagesPT";
import {messagesEN} from "./MessagesEN";

export const messages: MessageType = env.application.language === "PT" ? messagesPT : messagesEN;

export interface MessageType {
    INSUFFICIENT_FIELDS: string;
    TO_DO_ITEM_NOT_FOUND: string;
    CANNOT_PERFORM_THIS_ACTION: string;
    TO_DO_LIST_NOT_FOUND: string;
    NOT_FOUND: string;
    CUSTOMER_NOT_FOUND: string;
    MISSING_OR_WRONG_TOKEN: string;
    UNAUTHORIZED: string;
    INCORRECT_USER_OR_PASSWORD: string;
    PASSWORD_TOO_SHORT: string;
    UNKNOWN_ERROR: string;
    INVALID_USER_NAME: string
    INVALID_OBJECT: string
    FIELD_IS_NOT_EMAIL: string
    
    FIELD_IS_NULL(fieldName: string): string
    
    FIELD_IS_NOT_UUID(fieldName: string): string
}