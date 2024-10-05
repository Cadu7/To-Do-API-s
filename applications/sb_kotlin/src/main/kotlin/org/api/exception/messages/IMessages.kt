package org.api.exception.messages

interface IMessages {
    val INSUFFICIENT_FIELDS: String
    val TO_DO_ITEM_NOT_FOUND: String
    val CANNOT_PERFORM_THIS_ACTION: String
    val TO_DO_LIST_NOT_FOUND: String
    val NOT_FOUND: String
    val CUSTOMER_NOT_FOUND: String
    val MISSING_OR_WRONG_TOKEN: String
    val UNAUTHORIZED: String
    val INCORRECT_USER_OR_PASSWORD: String
    val PASSWORD_TOO_SHORT: String
    val UNKNOWN_ERROR: String
    val INVALID_USER_NAME: String
    val INVALID_OBJECT: String
    val FIELD_IS_NOT_EMAIL: String
    fun FIELD_IS_NULL(fieldName: String): String
    fun FIELD_IS_NOT_UUID(fieldName: String): String
}