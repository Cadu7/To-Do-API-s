package org.api.util;

public class ValidationUtils {

    private static final String EMAIL_REGEX = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$";

    public static boolean isNullOrBlank(String value) {
        return value == null || value.isBlank();
    }

    public static boolean isNotValidEmail(String email) {
        return !email.matches(EMAIL_REGEX);
    }

    public static boolean isTooShort(String value, int length) {
        return value.length() < length;
    }

}
