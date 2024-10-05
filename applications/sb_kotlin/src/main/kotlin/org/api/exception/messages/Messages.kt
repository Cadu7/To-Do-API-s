package org.api.exception.messages

import org.api.config.Env
import org.api.exception.AppConfigException

class Messages {

    fun getInstance(): IMessages = when (Env().language) {
        "EN" -> IMessagesEN()
        "PT" -> IMessagesPT()
        else -> throw AppConfigException("You must configure the language for the application: values => EN | PT")
    }
}