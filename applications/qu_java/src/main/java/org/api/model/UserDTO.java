package org.api.model;

import org.api.exception.InvalidRequestException;
import org.api.util.Validatable;

import static org.api.exception.Messages.*;
import static org.api.util.ValidationUtils.*;

public record UserDTO(String email, String name, String password) implements Validatable {

    public void validate() throws InvalidRequestException {

        if (isNullOrBlank(this.name)) {
            throw new InvalidRequestException(INVALID_REQUEST, fieldIsNUllOrBlank("name"));
        }

        if (isNullOrBlank(this.email)) {
            throw new InvalidRequestException(INVALID_REQUEST, fieldIsNUllOrBlank("email"));
        } else if (isNotValidEmail(this.email)) {
            throw new InvalidRequestException(INVALID_REQUEST, EMAIL_IS_INVALID);
        }

        if (isNullOrBlank(this.password)) {
            throw new InvalidRequestException(INVALID_REQUEST, fieldIsNUllOrBlank("password"));
        } else if (isTooShort(this.password, 12)) {
            throw new InvalidRequestException(INVALID_REQUEST, PASSWORD_TOO_SHORT);
        }
    }

}
