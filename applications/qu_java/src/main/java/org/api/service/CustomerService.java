package org.api.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.api.entity.Customer;
import org.api.entity.User;
import org.api.model.UserDTO;
import org.api.repository.CustomerRepository;

import java.util.Optional;

@ApplicationScoped
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public void create(UserDTO userInput) {
        userInput.validate();
        User user = new User(userInput.email(), userInput.password());
        repository.persist(new Customer(userInput.name(), user));
    }

    public Optional<Customer> find(String email) {
        return repository.find("user.email = ?1", email).firstResultOptional();
    }
}
