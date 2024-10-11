package org.api.exception;

import lombok.Getter;

@Getter
public class InvalidRequestException extends RuntimeException {

    private final ErrorResponseBody error;
    private final int status = 400;

    public InvalidRequestException(String error, String message) {
        super(error);
        this.error = new ErrorResponseBody(error, message);
    }

}
