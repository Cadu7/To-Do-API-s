package org.api.model;

import lombok.Getter;
import lombok.Setter;
import org.api.exception.InvalidRequestException;
import org.api.util.Validatable;

import static org.api.exception.Messages.*;
import static org.api.util.ValidationUtils.*;

@Getter
@Setter
public class UserDTO implements Validatable {

    private String email;
    private String name;
    private String password;

    public void validate() throws InvalidRequestException {

        if (isNullOrBlank(this.name)) {
            throw new InvalidRequestException(INVALID_REQUEST, fieldIsNUllOrBlank("name"));
        }

        if (isNullOrBlank(this.email)) {
            throw new InvalidRequestException(INVALID_REQUEST, fieldIsNUllOrBlank("email"));
        } else if (isValidEmail(this.email)) {
            throw new InvalidRequestException(INVALID_REQUEST, EMAIL_IS_INVALID);
        }

        if (isNullOrBlank(this.password)) {
            throw new InvalidRequestException(INVALID_REQUEST, fieldIsNUllOrBlank("password"));
        } else if (isTooShort(this.password, 12)) {
            throw new InvalidRequestException(INVALID_REQUEST, PASSWORD_TOO_SHORT);
        }
    }

}
