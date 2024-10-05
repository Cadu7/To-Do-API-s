package org.api.config

import org.springframework.beans.factory.annotation.Value

class Env {

    @Value("\${app.language}")
    lateinit var language: String

}