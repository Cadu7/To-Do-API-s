package org.api.controller;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.api.model.UserDTO;
import org.api.service.CustomerService;

import static jakarta.ws.rs.core.Response.Status.CREATED;

@Path("/user")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @POST
    public Response create(UserDTO user){
        service.create(user);
        return Response.status(CREATED).build();
    }


}
