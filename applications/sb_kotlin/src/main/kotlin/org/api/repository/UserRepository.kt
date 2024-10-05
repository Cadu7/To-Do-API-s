package org.api.repository

import org.api.entity.User
import org.api.model.UserData
import org.api.exception.InvalidRequest
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, String> {

    private fun countByEmail(email:String)

    fun checkIfAlreadyExist(email: String) {
        if (countByEmail(email) != 0 ){
            val message = Message().getInstance()
            throw InvalidRequest(message.INVALID_OBJECT,message.INVALID_USER_NAME)
        }
    }

    fun createNewUser(user: UserData): User {
        save(User(user))

    }

}
