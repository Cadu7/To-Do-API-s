import {MessageType} from "./Messages"

export const messagesPT: MessageType = {
  CANNOT_PERFORM_THIS_ACTION: "O usuario atual não pode executar esta ação ",
  NOT_FOUND: "Objeto não encontrado",
  TO_DO_LIST_NOT_FOUND: "Lista de a fazeres não encontrado",
  CUSTOMER_NOT_FOUND: "O cliente que fez a requisição não foi encontrado",
  MISSING_OR_WRONG_TOKEN: "Token não informado ou token de tipo incorreto",
  UNAUTHORIZED: "Não autorizado",
  INCORRECT_USER_OR_PASSWORD: "O usuário ou senha está incorreto",
  PASSWORD_TOO_SHORT: "A senha deve conter pelo menos 12 caracteres",
  FIELD_IS_NOT_EMAIL: "O email informado é inválido",
  INVALID_USER_NAME: "O email informado já está cadastrado",
  UNKNOWN_ERROR: "Erro desconhecido",
  FIELD_IS_NOT_UUID: (fieldName: string): string => `O campo ${fieldName} não é um UUID válido`,
  FIELD_IS_NULL: (fieldName: string): string => `O campo ${fieldName} não foi informado no corpo da requisição`,
  INVALID_OBJECT: "Objeto inválido"
}