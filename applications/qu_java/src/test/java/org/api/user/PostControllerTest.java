package org.api.user;

import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.api.entity.Customer;
import org.api.exception.ErrorResponseBody;
import org.api.exception.Messages;
import org.api.repository.CustomerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.api.TestUtil.toJson;
import static org.junit.jupiter.api.Assertions.assertEquals;

@QuarkusTest
public class PostControllerTest {

    @InjectMock
    CustomerRepository customerRepository;

    @Test
    @DisplayName("Response should return 400 for null name")
    public void nullName() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "test@email.com");
            put("password", "1234567896325");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("name"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for empty name")
    public void emptyName() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "test@email.com");
            put("password", "1234567896325");
            put("name", "");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("name"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for blank name")
    public void blankName() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "test@email.com");
            put("password", "1234567896325");
            put("name", " ");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("name"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for null email")
    public void nullEmail() {
        Map<String, Object> body = new HashMap<>() {{
            put("name", "test");
            put("password", "1234567896325");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("email"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for empty email")
    public void emptyEmail() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "");
            put("password", "1234567896325");
            put("name", "test");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("email"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for blank email")
    public void blankEmail() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "");
            put("password", "1234567896325");
            put("name", "test");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("email"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for invalid emails")
    public void invalidEmail() {
        List<String> emails = List.of("email", "email.com", "@email.com", "test@.com", "test@com");

        for (String email : emails) {
            Map<String, Object> body = new HashMap<>() {{
                put("email", email);
                put("password", "1234567896325");
                put("name", "test");
            }};

            Response response = given()
                    .when()
                    .body(toJson(body))
                    .contentType(ContentType.JSON)
                    .post("/user");

            assertEquals(400, response.statusCode());
            assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.EMAIL_IS_INVALID)), response.body().print());
        }

    }

    @Test
    @DisplayName("Response should return 400 for null password")
    public void nullPassword() {
        Map<String, Object> body = new HashMap<>() {{
            put("name", "test");
            put("email", "test@email.com");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("password"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for empty password")
    public void emptyPassword() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "test@email.com");
            put("password", "");
            put("name", "test");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("password"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for blank password")
    public void blankPassword() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "test@email.com");
            put("password", " ");
            put("name", "test");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.fieldIsNUllOrBlank("password"))), response.body().print());
    }

    @Test
    @DisplayName("Response should return 400 for invalid password")
    public void invalidPassword() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "test@email.com");
            put("password", "12345678912");
            put("name", "test");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        assertEquals(400, response.statusCode());
        assertEquals(toJson(new ErrorResponseBody(Messages.INVALID_REQUEST, Messages.PASSWORD_TOO_SHORT)), response.body().print());
    }

    @Test
    @DisplayName("Response should return 201 for valid request")
    public void shouldWork() {
        Map<String, Object> body = new HashMap<>() {{
            put("email", "test@email.com");
            put("password", "1234567897896");
            put("name", "test");
        }};

        Response response = given()
                .when()
                .body(toJson(body))
                .contentType(ContentType.JSON)
                .post("/user");

        Mockito.verify(customerRepository, Mockito.times(1)).persist(Mockito.any(Customer.class));
        assertEquals(201, response.statusCode());
    }

}
