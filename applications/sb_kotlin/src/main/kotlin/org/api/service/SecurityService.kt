package org.api.service

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class SecurityService {
    fun encryptPassword(password: String): String = BCryptPasswordEncoder().encode(password)
}
