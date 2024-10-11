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
@Entity(name = "list")
public class TodoList {

    @Id
    private UUID id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "customer", nullable = false)
    private Customer customer;
    @OneToMany
    @JoinColumn(name = "to_do_list")
    private List<TodoItem> items;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
