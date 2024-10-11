package org.api.entity;

import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
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
        this.password = BcryptUtil.bcryptHash(password, 10);
    }
}
