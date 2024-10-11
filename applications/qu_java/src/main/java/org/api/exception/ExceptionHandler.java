package org.api.exception;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import org.jboss.resteasy.reactive.server.ServerExceptionMapper;

@Provider
public class ExceptionHandler {

    @ServerExceptionMapper(InvalidRequestException.class)
    public Response handleInvalidRequest(InvalidRequestException exception) {
        return Response.status(exception.getStatus()).entity(exception.getError()).build();
    }

}
