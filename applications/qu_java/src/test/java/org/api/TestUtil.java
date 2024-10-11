package org.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.logging.Log;

public class TestUtil {

    public static String toJson(Object value) {
        try {
            return new ObjectMapper().writeValueAsString(value);
        } catch (Exception exception) {
            Log.error(exception);
            return null;
        }
    }

}
