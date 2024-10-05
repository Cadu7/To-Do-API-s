package org.api.exception

class InvalidRequest(private val error: String, override val message: String) : Exception() {
}
