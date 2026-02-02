package org.api.controller;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.api.model.AuthLogin;
import org.api.service.SessionService;

import static jakarta.ws.rs.core.Response.Status.OK;

@Path("/session")
public class SessionController {

    private final SessionService service;

    public SessionController(SessionService service) {
        this.service = service;
    }

    @POST
    @Path("/login")
    public Response login(AuthLogin login) {
        return Response.status(OK).entity(service.login(login)).build();
    }

}
