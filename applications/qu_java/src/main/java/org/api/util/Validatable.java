package org.api.util;

import org.api.exception.InvalidRequestException;

public interface Validatable {

    void validate() throws InvalidRequestException;

}
