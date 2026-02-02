package org.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

import static org.api.service.SessionService.encryptPassword;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity(name = "\"user\"")
public class User {

    @Id
    private UUID id;
    private String password;
    private String email;

    public User(String email, String password) {
        this.id = UUID.randomUUID();
        this.email = email;
        setPassword(password);
    }

    public void setPassword(String password) {
        this.password = encryptPassword(password);
    }
}
