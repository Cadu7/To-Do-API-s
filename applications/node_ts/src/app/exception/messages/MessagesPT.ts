import {MessageType} from "./Messages"

export const messagesPT: MessageType = {
  INCORRECT_USER_OR_PASSWORD: "O usuário ou senha está incorreto",
  PASSWORD_TOO_SHORT: "A senha deve conter pelo menos 12 caracteres",
  FIELD_IS_NOT_EMAIL: "O email informado é inválido",
  INVALID_USER_NAME: "O email informado já está cadastrado",
  UNKNOWN_ERROR: "Erro desconhecido",
  FIELD_IS_NOT_UUID: (fieldName: string): string => `O campo ${fieldName} não é um UUID válido`,
  FIELD_IS_NULL: (fieldName: string): string => `O campo ${fieldName} não foi informado no corpo da requisição`,
  INVALID_OBJECT: "Objeto inválido"
}