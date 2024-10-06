import {describe, expect, it} from "vitest";
import {customerMock, userMock} from "../mock/prisma";
import {messages} from "../../app/exception/messages/Messages";
import {apiServer} from "../mock/server";

describe("check functionalities of user", () => {
    
    let correctUser = {
        name: "Carlos Carvalho",
        email: "carlos@email.com",
        password: "123456789123"
    }
    
    describe("should test controller", () => {
        
        it("should create a new user and return 201", async () => {
            userMock.findFirst.mockResolvedValue(null)
            // @ts-ignore
            userMock.create.mockImplementation(params => ({
                    id: params.data.id,
                    email: params.data.email,
                    password: params.data.password
                })
            )
            // @ts-ignore
            customerMock.create.mockImplementation(params => ({
                    id: params.data.id,
                    name: params.data.name
                })
            )
            const response = await apiServer
                .post("/user")
                .send(correctUser)
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(201)
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(1)
            expect(userMock.findFirst).toHaveBeenCalledWith({where: {email: correctUser.email}})
            expect(userMock.create).toHaveBeenCalledTimes(1)
            expect(userMock.create).toHaveBeenCalledWith({
                data: {
                    email: correctUser.email,
                    password: expect.any(String),
                    id: expect.any(String)
                }
            })
            expect(customerMock.create).toHaveBeenCalledTimes(1)
            expect(customerMock.create).toHaveBeenCalledWith({
                data: {
                    id: expect.any(String),
                    created_at: expect.any(Date),
                    name: correctUser.name,
                    user: {
                        connect: {
                            id: expect.any(String)
                        }
                    },
                },
                include: {
                    user: true
                }
            })
        })
        
        it("should not create a user with the same email and return 400", async () => {
            userMock.findFirst.mockResolvedValue({
                id: "75a4b352-e3cb-11ed-b5ea-0242ac120002",
                email: correctUser.email,
                password: "123456789123"
            })
            const response = await apiServer
                .post("/user")
                .send(correctUser)
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.INVALID_USER_NAME})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(1)
            expect(userMock.findFirst).toHaveBeenCalledWith({where: {email: correctUser.email}})
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with undefined email and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, email: undefined})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.FIELD_IS_NULL("email")})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with null email and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, email: null})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.FIELD_IS_NULL("email")})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with blank email and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, email: " "})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.FIELD_IS_NULL("email")})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with empty email and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, email: ""})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.FIELD_IS_NULL("email")})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with undefined password and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, password: undefined})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.FIELD_IS_NULL("password")})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with null password and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, password: null})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.FIELD_IS_NULL("password")})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with blank password and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, password: " "})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.FIELD_IS_NULL("password")})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with empty password and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, password: ""})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.FIELD_IS_NULL("password")})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
        it("should not create a user with password too short and return 400", async () => {
            const response = await apiServer
                .post("/user")
                .send({...correctUser, password: "123456789"})
                .set('Accept', 'application/json')
            
            // verify status
            expect(response.status).toStrictEqual(400)
            expect(response.body).toStrictEqual({error: messages.INVALID_OBJECT, message: messages.PASSWORD_TOO_SHORT})
            
            // verify db calls
            expect(userMock.findFirst).toHaveBeenCalledTimes(0)
            expect(userMock.create).toHaveBeenCalledTimes(0)
            expect(customerMock.create).toHaveBeenCalledTimes(0)
        })
        
    })
    
})