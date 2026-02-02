package org.api.model;

import org.api.exception.InvalidRequestException;
import org.api.util.Validatable;

import static org.api.exception.Messages.INVALID_REQUEST;
import static org.api.exception.Messages.fieldIsNUllOrBlank;
import static org.api.util.ValidationUtils.isNullOrBlank;

public record AuthLogin(String username, String password) implements Validatable {

    public void validate() throws InvalidRequestException {
        if (isNullOrBlank(this.username)) {
            throw new InvalidRequestException(INVALID_REQUEST, fieldIsNUllOrBlank("username"));
        }
        if (isNullOrBlank(this.password)) {
            throw new InvalidRequestException(INVALID_REQUEST, fieldIsNUllOrBlank("password"));
        }
    }
}
