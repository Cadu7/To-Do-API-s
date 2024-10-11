package org.api.exception;

public class Messages {

    public static final String PASSWORD_TOO_SHORT = "The password is too short";
    public static final String EMAIL_IS_INVALID = "The email informed is not a valid email";
    public static final String INVALID_REQUEST = "Invalid request";

    public static String fieldIsNUllOrBlank(String field) {
        return "The field " + field + " is null or blank";
    }

}
