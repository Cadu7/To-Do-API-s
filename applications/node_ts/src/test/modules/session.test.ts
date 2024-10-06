import {describe, expect, it} from "vitest";
import {SecurityService} from "../../app/service/SecurityService";
import {customerMock} from "../mock/prisma";
import {apiServer} from "../mock/server";
import {messages} from "../../app/exception/messages/Messages";

describe("check functionalities of session", () => {
    let password = "123456789";
    
    let correctUser = {
        username: "carlos@gmail.com",
        password
    }
    let encodedPassword = new SecurityService().encryptPassword(password);
    
    describe("should test controller", () => {
        it("should login and return a token and 200 status", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: "60a40fe8-6fb8-4382-850d-55188fbbe489",
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: correctUser.username,
                    password: await encodedPassword,
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            
            let response = await apiServer
                .post("/session/login")
                .send(correctUser);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("token");
            expect(response.body.token).not.toBeNull();
            expect(response.body.token).toBeTypeOf("string");
            expect(customerMock.findFirst).toHaveBeenCalledTimes(1);
            expect(customerMock.findFirst).toHaveBeenCalledWith({
                include: {
                    user: true
                },
                where: {
                    user: {
                        email: correctUser.username
                    }
                }
            });
            
        })
        
        it("should return 400 status when username undefined is not informed", async () => {
            let response = await apiServer
                .post("/session/login")
                .send({...correctUser, username: undefined});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("username")
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(0);
        })
        
        it("should return 400 status when username null is not informed", async () => {
            let response = await apiServer
                .post("/session/login")
                .send({...correctUser, username: null});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("username")
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(0);
        })
        
        it("should return 400 status when username empty is not informed", async () => {
            let response = await apiServer
                .post("/session/login")
                .send({...correctUser, username: ""});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("username")
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(0);
        })
        it("should return 400 status when username blank is not informed", async () => {
            let response = await apiServer
                .post("/session/login")
                .send({...correctUser, username: " "});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("username")
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(0);
        })
        
        it("should return 400 status when password undefined is not informed", async () => {
            let response = await apiServer
                .post("/session/login")
                .send({...correctUser, password: undefined});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("password")
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(0);
        })
        
        it("should return 400 status when password null is not informed", async () => {
            let response = await apiServer
                .post("/session/login")
                .send({...correctUser, password: null});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("password")
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(0);
        })
        
        it("should return 400 status when password empty is not informed", async () => {
            let response = await apiServer
                .post("/session/login")
                .send({...correctUser, password: ""});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("password")
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(0);
        })
        it("should return 400 status when password blank is not informed", async () => {
            let response = await apiServer
                .post("/session/login")
                .send({...correctUser, password: " "});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("password")
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(0);
        })
        
        it("should return 401 status when user is not found", async () => {
            customerMock.findFirst.mockResolvedValue(null);
            let response = await apiServer
                .post("/session/login")
                .send(correctUser);
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.INCORRECT_USER_OR_PASSWORD
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(1);
            expect(customerMock.findFirst).toHaveBeenCalledWith({
                include: {
                    user: true
                },
                where: {
                    user: {
                        email: correctUser.username
                    }
                }
            });
        })
        
        it("should return 401 status when password is incorrect", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: "60a40fe8-6fb8-4382-850d-55188fbbe489",
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: correctUser.username,
                    password: await new SecurityService().encryptPassword("different password"),
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            
            let response = await apiServer
                .post("/session/login")
                .send(correctUser);
            
            expect(response.status).toBe(401);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.INCORRECT_USER_OR_PASSWORD
            });
            expect(customerMock.findFirst).toHaveBeenCalledTimes(1);
            expect(customerMock.findFirst).toHaveBeenCalledWith({
                include: {
                    user: true
                },
                where: {
                    user: {
                        email: correctUser.username
                    }
                }
            });
        })
        
        
    })
    
    
})