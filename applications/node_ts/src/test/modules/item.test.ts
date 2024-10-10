import {beforeAll, describe, expect, it} from "vitest";
import {customerMock, listMock} from "../mock/prisma";
import {SecurityService} from "../../app/service/SecurityService";
import {apiServer} from "../mock/server";
import {messages} from "../../app/exception/messages/Messages";
import {v4} from "uuid";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

describe("check functionalities of item of todo list", () => {
    
    let token: string;
    let tokenWithBearer: string;
    let listId = "4fdd2215-bc0e-4f37-9ae2-317d5def491a";
    let itemId = "11819d03-a22b-4644-a72a-2ce672fb9c7c";
    let customerId = "2e29bff1-e9e9-4d0b-9d3a-fda63c44d719";
    
    beforeAll(async () => {
        let customerDbResponse = {
            id: customerId,
            name: "Carlos",
            user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
            user: {
                email: "carlos@email.com",
                password: await new SecurityService().encryptPassword("123456789147852"),
                id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
            }
        };
        customerMock.findFirst.mockResolvedValue(customerDbResponse as any);
        let response = await apiServer.post("/session/login").send({
            username: "carlos@email.com",
            password: "123456789147852"
        });
        token = response.body.token;
        tokenWithBearer = "Bearer " + token;
    })
    
    describe("should test patch controller", () => {
        
        it("should return 401 if token is not informed", async () => {
            let response = await apiServer.patch(`/to-do/item/${listId}`).send([{content: "New content"}]);
            expect(response.status).toBe(401);
        })
        
        it("should return 401 if token is not Bearer", async () => {
            let response = await apiServer.patch(`/to-do/item/${listId}`).set({"Authorization": token}).send([{content: "New content"}]);
            expect(response.status).toBe(401);
        })
        
        it("should return 404 if todo list not found", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: customerId,
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: "carlos@email.com",
                    password: await new SecurityService().encryptPassword("123456789147852"),
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            listMock.findMany.mockResolvedValue([])
            
            let response = await apiServer.patch(`/to-do/item/${listId}`).set({"Authorization": tokenWithBearer}).send([{content: "New content"}]);
            
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({error: messages.NOT_FOUND, message: messages.TO_DO_LIST_NOT_FOUND});
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                where: {
                    customer: {
                        id: customerId
                    }
                },
                select: {
                    id: true
                }
            })
            expect(customerMock.findFirst).toBeCalledTimes(1);
        })
        
        it("should return 400 if todo list id is not an uuid", async () => {
            
            let response = await apiServer.patch(`/to-do/item/invalid-uuid`).set({"Authorization": tokenWithBearer}).send([{content: "New content"}]);
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NOT_UUID("toDoId")
            });
        })
        
        it("should return 400 if todo body is not send", async () => {
            
            let response = await apiServer.patch(`/to-do/item/${listId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("items")
            });
        })
        
        it("should return 400 if todo body is empty", async () => {
            
            let response = await apiServer.patch(`/to-do/item/${listId}`).set({"Authorization": tokenWithBearer}).send([]);
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("items")
            });
        })
        
        it("should return 200 if success", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: customerId,
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: "carlos@email.com",
                    password: await new SecurityService().encryptPassword("123456789147852"),
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            let dbResponse = {
                id: listId,
                name: "List of to do",
                updated_at: new Date(),
                created_at: new Date(),
                customer_id: customerId,
                items: [
                    {id: v4(), content: "item 1", done: false, to_do_list_id: listId}
                ],
                customer: {
                    id: customerId,
                    name: "Carlos",
                    user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                    user: {
                        email: "carlos@email.com",
                        password: await new SecurityService().encryptPassword("123456789147852"),
                        id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                    }
                }
            };
            listMock.findMany.mockResolvedValue([dbResponse])
            
            let response = await apiServer.patch(`/to-do/item/${listId}`).set({"Authorization": tokenWithBearer}).send([{content: "New content"}]);
            
            expect(response.status).toBe(200);
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                where: {
                    customer: {
                        id: customerId
                    }
                },
                select: {
                    id: true
                }
            })
            expect(listMock.update).toBeCalledTimes(1);
            expect(listMock.update).toBeCalledWith({
                where: {
                    id: listId
                },
                data: {
                    items: {
                        createMany: {
                            data: [
                                {id: expect.any(String), content: "New content"}
                            ]
                        }
                    },
                    updated_at: expect.any(Date)
                }
            })
        })
        
    })
    
    describe("should test put controller", () => {
        
        it("should return 401 if token is not informed", async () => {
            let response = await apiServer.put(`/to-do/item/${listId}/${itemId}`).send({done: true});
            expect(response.status).toBe(401);
        })
        
        it("should return 401 if token is not Bearer", async () => {
            let response = await apiServer.put(`/to-do/item/${listId}/${itemId}`).set({"Authorization": token}).send({done: true});
            expect(response.status).toBe(401);
        })
        
        it("should return 404 if todo list not found", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: customerId,
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: "carlos@email.com",
                    password: await new SecurityService().encryptPassword("123456789147852"),
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            listMock.findMany.mockResolvedValue([])
            
            let response = await apiServer.put(`/to-do/item/${listId}/${itemId}`).set({"Authorization": tokenWithBearer}).send({done: true});
            
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({error: messages.NOT_FOUND, message: messages.TO_DO_LIST_NOT_FOUND});
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                where: {
                    customer: {
                        id: customerId
                    }
                },
                select: {
                    id: true
                }
            })
            expect(customerMock.findFirst).toBeCalledTimes(1);
        })
        
        it("should return 400 if todo list id is not an uuid", async () => {
            
            let response = await apiServer.patch(`/to-do/item/invalid-uuid`).set({"Authorization": tokenWithBearer}).send({done: true});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NOT_UUID("toDoId")
            });
        })
        
        it("should return 400 if todo body is not send", async () => {
            
            let response = await apiServer.put(`/to-do/item/${listId}/${itemId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("done")
            });
        })
        
        it("should return 400 if todo body is empty", async () => {
            
            let response = await apiServer.put(`/to-do/item/${listId}/${itemId}`).set({"Authorization": tokenWithBearer}).send({});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("done")
            });
        })
        
        it("should return 200 if success", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: customerId,
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: "carlos@email.com",
                    password: await new SecurityService().encryptPassword("123456789147852"),
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            let dbResponse = {
                id: listId,
                name: "List of to do",
                updated_at: new Date(),
                created_at: new Date(),
                customer_id: customerId,
                items: [
                    {id: itemId, content: "item 1", done: false, to_do_list_id: listId}
                ],
                customer: {
                    id: customerId,
                    name: "Carlos",
                    user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                    user: {
                        email: "carlos@email.com",
                        password: await new SecurityService().encryptPassword("123456789147852"),
                        id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                    }
                }
            };
            listMock.findMany.mockResolvedValue([dbResponse])
            listMock.update.mockResolvedValue(null as any)
            
            let response = await apiServer.put(`/to-do/item/${listId}/${itemId}`).set({"Authorization": tokenWithBearer}).send({done: true});
            
            expect(response.status).toBe(200);
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                where: {
                    customer: {
                        id: customerId
                    }
                },
                select: {
                    id: true
                }
            })
            expect(listMock.update).toBeCalledTimes(1);
            expect(listMock.update).toBeCalledWith({
                where: {id: listId},
                data: {
                    items: {
                        update: {
                            where: {
                                id: itemId
                            },
                            data: {
                                done: true
                            }
                        }
                    },
                    updated_at: expect.any(Date)
                }
            })
        })
        
        it("should return 404 if item is not found", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: customerId,
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: "carlos@email.com",
                    password: await new SecurityService().encryptPassword("123456789147852"),
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            let dbResponse = {
                id: listId,
                name: "List of to do",
                updated_at: new Date(),
                created_at: new Date(),
                customer_id: customerId,
                items: [
                    {id: v4(), content: "item 1", done: false, to_do_list_id: listId}
                ],
                customer: {
                    id: customerId,
                    name: "Carlos",
                    user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                    user: {
                        email: "carlos@email.com",
                        password: await new SecurityService().encryptPassword("123456789147852"),
                        id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                    }
                }
            };
            listMock.findMany.mockResolvedValue([dbResponse])
            listMock.update.mockRejectedValue(new PrismaClientKnownRequestError("error", {
                code: "P2025",
                clientVersion: "2.25.0"
            }))
            
            let response = await apiServer.put(`/to-do/item/${listId}/${itemId}`).set({"Authorization": tokenWithBearer}).send({done: true});
            
            console.log(response)
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({error: messages.NOT_FOUND, message: messages.TO_DO_ITEM_NOT_FOUND});
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                where: {
                    customer: {
                        id: customerId
                    }
                },
                select: {
                    id: true
                }
            })
            expect(listMock.update).toBeCalledTimes(1);
            expect(listMock.update).toBeCalledWith({
                where: {
                    id: listId
                },
                data: {
                    items: {
                        update: {
                            data: {
                                done: true
                            },
                            where: {
                                id: itemId
                            }
                        }
                    },
                    updated_at: expect.any(Date)
                }
            })
        })
        
    })
    
    describe("should test delete controller", () => {
        
        it("should return 401 if token is not informed", async () => {
            let response = await apiServer.delete(`/to-do/item/${listId}/${itemId}`);
            expect(response.status).toBe(401);
        })
        
        it("should return 401 if token is not Bearer", async () => {
            let response = await apiServer.delete(`/to-do/item/${listId}/${itemId}`).set({"Authorization": token});
            expect(response.status).toBe(401);
        })
        
        it("should return 404 if todo list not found", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: customerId,
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: "carlos@email.com",
                    password: await new SecurityService().encryptPassword("123456789147852"),
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            listMock.findMany.mockResolvedValue([])
            
            let response = await apiServer.delete(`/to-do/item/${listId}/${itemId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({error: messages.NOT_FOUND, message: messages.TO_DO_LIST_NOT_FOUND});
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                where: {
                    customer: {
                        id: customerId
                    }
                },
                select: {
                    id: true
                }
            })
            expect(customerMock.findFirst).toBeCalledTimes(1);
        })
        
        it("should return 400 if todo list id is not an uuid", async () => {
            
            let response = await apiServer.delete(`/to-do/item/invalid-uuid/${itemId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NOT_UUID("toDoId")
            });
        })
        
        it("should return 400 if todo item id is not an uuid", async () => {
            
            let response = await apiServer.delete(`/to-do/item/${listId}/invalid-uuid`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NOT_UUID("itemId")
            });
        })
        
        it("should return 200 if success", async () => {
            customerMock.findFirst.mockResolvedValue({
                id: customerId,
                name: "Carlos",
                user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                user: {
                    email: "carlos@email.com",
                    password: await new SecurityService().encryptPassword("123456789147852"),
                    id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                }
            } as any);
            let dbResponse = {
                id: listId,
                name: "List of to do",
                updated_at: new Date(),
                created_at: new Date(),
                customer_id: customerId,
                items: [
                    {id: itemId, content: "item 1", done: false, to_do_list_id: listId}
                ],
                customer: {
                    id: customerId,
                    name: "Carlos",
                    user_id: "9985c7f5-1852-4c0c-8dad-77a03801635d",
                    user: {
                        email: "carlos@email.com",
                        password: await new SecurityService().encryptPassword("123456789147852"),
                        id: "9985c7f5-1852-4c0c-8dad-77a03801635d"
                    }
                }
            };
            listMock.findMany.mockResolvedValue([dbResponse])
            listMock.update.mockResolvedValue(null as any)
            
            let response = await apiServer.delete(`/to-do/item/${listId}/${itemId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(200);
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                where: {
                    customer: {
                        id: customerId
                    }
                },
                select: {
                    id: true
                }
            })
            expect(listMock.update).toBeCalledTimes(1);
            expect(listMock.update).toBeCalledWith({
                where: {id: listId},
                data: {
                    items: {
                        delete: {
                            id: itemId
                        }
                    },
                    updated_at: expect.any(Date)
                }
            })
        })
        
    })
    
})