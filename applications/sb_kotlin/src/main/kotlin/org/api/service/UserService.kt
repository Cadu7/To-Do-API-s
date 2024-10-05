package org.api.service

import org.api.entity.User
import org.api.exception.InvalidRequest
import org.api.exception.messages.IMessages
import org.api.exception.messages.Messages
import org.api.model.UserData
import org.api.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository, private val securityService: SecurityService) {

    private val message: IMessages = Messages().getInstance()

    fun create(user: UserData) {
        validateFieldIsNull("name", user.name)
        validateFieldIsNull("email", user.email)
        validateFieldIsNull("password", user.password)

        if (user.password.length < 12) {
            throw InvalidRequest(message.INVALID_OBJECT, message.PASSWORD_TOO_SHORT)
        }

        userRepository.checkIfAlreadyExist(user.email)
        user.password = securityService.encryptPassword(user.password)

//        log.info(`Creating new user for application`)
        val createdUser = userRepository.createNewUser(user);
        createCustomer(createdUser);
//        log.info(`The user was successfully created`)
    }

    private fun createCustomer(user: User): Void {

    }

    private fun validateFieldIsNull(fieldName: String, data: String?): Void {
        if (data.isNullOrBlank()) {
            throw InvalidRequest(message.INVALID_OBJECT, message.FIELD_IS_NULL(fieldName))
        }
    }
}