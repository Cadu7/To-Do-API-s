package org.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "customer")
public class Customer {

    @Id
    private UUID id;
    private String name;
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "\"user\"", nullable = false)
    private User user;
    @OneToMany(mappedBy = "customer")
    private List<TodoList> lists;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Customer(String name, User user) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }
}
