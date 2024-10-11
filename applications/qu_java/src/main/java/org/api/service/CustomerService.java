package org.api.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.api.entity.Customer;
import org.api.entity.User;
import org.api.model.UserDTO;
import org.api.repository.CustomerRepository;

@ApplicationScoped
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void create(UserDTO userInput) {
        userInput.validate();
        User user = new User(userInput.getEmail(), userInput.getPassword());
        repository.persist(new Customer(userInput.getName(), user));
    }

}
