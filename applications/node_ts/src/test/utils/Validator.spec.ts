import {describe, expect, it} from "vitest"
import {checkIsEmail, checkIsEmpty, checkIsEmptyList, checkIsNull, checkIsUUID} from "../../app/utils/Validator";
import {InvalidRequestException} from "../../app/exception/InvalidRequestException";

describe('check validations', () => {

  it('should throw invalidRequestException for null object', () => {
    const test = null;
    expect(() => checkIsNull(test, "test")).toThrow(InvalidRequestException)
  })
  it('should not throw invalidRequestException for not null object', () => {
    const test: string = "test";
    expect(() => checkIsNull(test, "test")).not.toThrow()
  })


  it('should throw invalidRequestException for empty string', () => {
    const test: string = "";
    expect(() => checkIsEmpty(test, "test")).toThrow(InvalidRequestException)
  })
  it('should not throw invalidRequestException for not empty string', () => {
    const test: string = "test";
    expect(() => checkIsEmpty(test, "test")).not.toThrow()
  })


  it('should throw invalidRequestException for no email format strings', () => {

    const email01: string = "test@emailcom";
    const email02: string = "testemailcom";
    const email03: string = "testemail.com";
    const email04: string = "@email.com";
    const email05: string = "email.com";

    expect(() => checkIsEmail(email01, "test")).toThrow(InvalidRequestException)
    expect(() => checkIsEmail(email02, "test")).toThrow(InvalidRequestException)
    expect(() => checkIsEmail(email03, "test")).toThrow(InvalidRequestException)
    expect(() => checkIsEmail(email04, "test")).toThrow(InvalidRequestException)
    expect(() => checkIsEmail(email05, "test")).toThrow(InvalidRequestException)
  })
  it('should not throw invalidRequestException for email format strings', () => {
    const emailValid: string = "test@email.com";
    expect(() => checkIsEmpty(emailValid, "test")).not.toThrow()
  })

  it('should throw invalidRequestException for invalid uuid', () => {
    const uuid: string = "this is an random string";
    expect(() => checkIsUUID(uuid, "test")).toThrow(InvalidRequestException)
  })
  it('should not throw invalidRequestException for valid uuid', () => {
    const uuid: string = "75a4b352-e3cb-11ed-b5ea-0242ac120002";
    expect(() => checkIsUUID(uuid, "test")).not.toThrow()
  })

  it('should not throw invalidRequestException for list not empty', () => {
    const list: number[] = [0, 1, 2, 3];
    expect(() => checkIsEmptyList(list, "list")).not.toThrow(InvalidRequestException)
  })
  it('should throw invalidRequestException for list empty', () => {
    const list: number[] = [];
    const listNull: any = [];

    expect(() => checkIsEmptyList(list, "list")).toThrow(InvalidRequestException)
    expect(() => checkIsEmptyList(listNull, "list")).toThrow(InvalidRequestException)
  })

})