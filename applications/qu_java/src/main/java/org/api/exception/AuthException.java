package org.api.exception;

import lombok.Getter;

@Getter
public class AuthException extends RuntimeException{

    private final ErrorResponseBody error;
    private final int status = 401;

    public AuthException(String message) {
        super(Messages.AUTH_ERROR);
        this.error = new ErrorResponseBody(Messages.AUTH_ERROR, message);
    }

}
