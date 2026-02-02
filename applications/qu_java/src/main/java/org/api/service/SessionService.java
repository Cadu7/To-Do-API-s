package org.api.service;

import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import org.api.entity.Customer;
import org.api.exception.AuthException;
import org.api.exception.Messages;
import org.api.model.AuthLogin;
import org.eclipse.microprofile.config.ConfigProvider;

@ApplicationScoped
public class SessionService {

    private final CustomerService customerService;
    private static final String ISSUER = "to-do-api-java";
    private static final Long EXPIRE_TIME;

    static {
        int converterSecToHour = 3600;
        Long expireTimeProp = ConfigProvider.getConfig().getValue("security.expire_in_hour", Long.class);
        EXPIRE_TIME = (expireTimeProp == null ? 1 : expireTimeProp) * converterSecToHour;
    }

    public SessionService(CustomerService customerService) {
        this.customerService = customerService;
    }

    public String login(AuthLogin login) {
        Customer customer = customerService.find(login.username())
                .orElseThrow(() -> new AuthException(Messages.USERNAME_OR_PASSWORD_INCORRECT));

        if (!verifyPassword(login.password(), customer.getUser().getPassword())) {
            throw new AuthException(Messages.USERNAME_OR_PASSWORD_INCORRECT);
        }
        return generateJwt(customer);
    }

    private boolean verifyPassword(String password, String hashedPassword) {
        return BcryptUtil.matches(password, hashedPassword);
    }

    public static String encryptPassword(String password){
        return BcryptUtil.bcryptHash(password, 10);
    }

    private String generateJwt(Customer customer) {
        return Jwt.issuer(ISSUER)
                .expiresIn(EXPIRE_TIME)
                .claim("email", customer.getUser().getEmail())
                .claim("name", customer.getName())
                .sign();
    }

}
