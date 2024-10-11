package org.api.util;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.api.util.ValidationUtils.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
public class ValidationTest {

    @Test
    @DisplayName("isNullOrBlank should work")
    public void testIsNullOrBlank() {
        assertTrue(isNullOrBlank(null));
        assertTrue(isNullOrBlank(""));
        assertTrue(isNullOrBlank(" "));
        assertFalse(isNullOrBlank("test"));
    }
    @Test
    @DisplayName("isValidEmail should work")
    public void testIsValidEmail() {
        assertTrue(isNotValidEmail("test"));
        assertTrue(isNotValidEmail("test.com"));
        assertTrue(isNotValidEmail("test@email"));
        assertTrue(isNotValidEmail("test@emailcom"));
        assertTrue(isNotValidEmail("@emailcom"));
        assertFalse(isNotValidEmail("correct@email.com"));
    }

    @Test
    @DisplayName("isTooShort should work")
    public void testIsTooShort() {
        assertTrue(isTooShort("test", 5));
        assertFalse(isTooShort("test", 4));
    }

}
