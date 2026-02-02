package org.api.exception;

import lombok.Getter;

@Getter
public class InvalidRequestException extends RuntimeException {

    private final ErrorResponseBody error;
    private int status = 400;

    public InvalidRequestException(String error, String message) {
        super(error);
        this.error = new ErrorResponseBody(error, message);
    }

    public InvalidRequestException(String error, String message, int status) {
        super(error);
        this.status = status;
        this.error = new ErrorResponseBody(error, message);
    }

}
