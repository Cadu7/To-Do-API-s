package org.api.web.controller

import org.api.model.UserData
import org.api.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController(private val userService: UserService) {

    @PostMapping
    fun create(@RequestBody user: UserData): ResponseEntity<Void> {
        userService.create(user)
        return ResponseEntity.status(201).build();
    }

}