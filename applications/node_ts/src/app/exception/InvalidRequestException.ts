import {BodyException} from "./BodyException";

export class InvalidRequestException extends BodyException {
    
    readonly status: number
    
    constructor(error: string, message: string, status: number = 400) {
        super(error, message);
        this.status = status;
    }
}