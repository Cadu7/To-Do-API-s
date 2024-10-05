package org.api.entity

import org.api.model.UserData

class User() {

    @Id
    val id: String?
    val email: String
    val name: String
    val password: String

    constructor(user: UserData) : this() {
        this.email = user.email
        this.password = user.password
        this.name = user.name
    }
}
