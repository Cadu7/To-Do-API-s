import {beforeAll, describe, expect, it} from "vitest";
import {apiServer} from "../mock/server";
import {customerMock, listMock} from "../mock/prisma";
import {SecurityService} from "../../app/service/SecurityService";
import {messages} from "../../app/exception/messages/Messages";
import {v4} from "uuid";

describe("check functionalities of list of to do", () => {
    
    let token: string;
    let tokenWithBearer: string;
    let customerId = "60a40fe8-6fb8-4382-850d-55188fbbe489";
    let toDoCorrect = {
        name: "List of to do",
        items: [
            {
                content: "item 1",
            }
        ]
    }
    
    beforeAll(async () => {
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
        let response = await apiServer.post("/session/login").send({
            username: "carlos@email.com",
            password: "123456789147852"
        });
        token = response.body.token;
        tokenWithBearer = "Bearer " + token;
    })
    
    describe("should test post controller", () => {
        
        it("should return 401 if token is not informed", async () => {
            let response = await apiServer.post("/to-do").send(toDoCorrect);
            expect(response.status).toBe(401);
        })
        
        it("should return 401 if token is not Bearer", async () => {
            let response = await apiServer.post("/to-do").set({"Authorization": token}).send(toDoCorrect);
            expect(response.status).toBe(401);
        })
        
        it("should return 201 for success and location", async () => {
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
            // @ts-ignore
            listMock.create.mockImplementation(params => ({
                id: params.data.id,
                name: params.data.name,
                updated_at: params.data.updated_at,
                created_at: params.data.created_at,
                customer_id: params.data.customer?.connect?.id,
            }))
            let response = await apiServer.post("/to-do").set({"Authorization": tokenWithBearer}).send(toDoCorrect);
            
            expect(response.status).toBe(201);
            expect(response.body).toStrictEqual({});
            // @ts-ignore
            expect(response.header.location).toContain(`https://${response.request.host}/to-do/`);
            
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.create).toBeCalledTimes(1);
            expect(listMock.create).toBeCalledWith({
                data: {
                    id: expect.any(String),
                    name: toDoCorrect.name,
                    updated_at: expect.any(Date),
                    created_at: expect.any(Date),
                    items: {create: toDoCorrect.items.map(item => ({id: expect.any(String), content: item.content}))},
                    customer: {
                        connect: {
                            id: customerId
                        }
                    }
                },
                include: {
                    items: true,
                    customer: true
                }
            })
        })
        
        it("should return 400 for name undefined", async () => {
            let response = await apiServer.post("/to-do")
                .set({"Authorization": tokenWithBearer})
                .send({...toDoCorrect, name: undefined});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("name")
            });
            
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.create).toBeCalledTimes(0);
        })
        
        it("should return 400 for name null", async () => {
            let response = await apiServer.post("/to-do")
                .set({"Authorization": tokenWithBearer})
                .send({...toDoCorrect, name: null});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("name")
            });
            
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.create).toBeCalledTimes(0);
        })
        
        it("should return 400 for name empty", async () => {
            let response = await apiServer.post("/to-do")
                .set({"Authorization": tokenWithBearer})
                .send({...toDoCorrect, name: ""});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("name")
            });
            
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.create).toBeCalledTimes(0);
        })
        
        it("should return 400 for name blank", async () => {
            let response = await apiServer.post("/to-do")
                .set({"Authorization": tokenWithBearer})
                .send({...toDoCorrect, name: " "});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("name")
            });
            
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.create).toBeCalledTimes(0);
        })
        
    })
    
    describe("should test get all controller", () => {
        
        it("should return 401 if token is not informed", async () => {
            let response = await apiServer.get("/to-do");
            expect(response.status).toBe(401);
        })
        
        it("should return 401 if token is not Bearer", async () => {
            let response = await apiServer.get("/to-do").set({"Authorization": token});
            expect(response.status).toBe(401);
        })
        
        it("should return 200 for success", async () => {
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
            // @ts-ignore
            let listId = v4();
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
            listMock.findMany.mockResolvedValue([dbResponse] as any)
            
            let response = await apiServer.get("/to-do").set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual([
                {
                    id: dbResponse.id,
                    name: dbResponse.name,
                    lastUpdate: expect.anything(),
                    items: dbResponse.items.map(item => ({content: item.content, done: item.done, id: item.id}))
                }
            ]);
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                include: {
                    customer: true,
                    items: true
                },
                where: {
                    customer: {
                        id: customerId
                    }
                }
            })
        })
        
        it("should return 404 for not found any list for user", async () => {
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
            
            let response = await apiServer.get("/to-do").set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({error: messages.NOT_FOUND, message: messages.TO_DO_LIST_NOT_FOUND});
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledTimes(1);
            expect(listMock.findMany).toBeCalledWith({
                include: {
                    customer: true,
                    items: true
                },
                where: {
                    customer: {
                        id: customerId
                    }
                }
            })
        })
        
    })
    
    describe("should test get one controller", () => {
        
        let listId = "7ddea73e-f585-437b-a8f0-2ff008ce64b6"
        
        it("should return 401 if token is not informed", async () => {
            let response = await apiServer.get(`/to-do/${listId}`);
            expect(response.status).toBe(401);
        })
        
        it("should return 401 if token is not Bearer", async () => {
            let response = await apiServer.get(`/to-do/${listId}`).set({"Authorization": token});
            expect(response.status).toBe(401);
        })
        
        it("should return 200 for success", async () => {
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
            // @ts-ignore
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
            listMock.findFirst.mockResolvedValue(dbResponse as any)
            
            let response = await apiServer.get(`/to-do/${listId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual({
                    id: dbResponse.id,
                    name: dbResponse.name,
                    lastUpdate: expect.anything(),
                    items: dbResponse.items.map(item => ({content: item.content, done: item.done, id: item.id}))
                }
            );
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findFirst).toBeCalledWith({
                include: {
                    customer: true,
                    items: true
                },
                where: {
                    id: listId,
                    customer: {
                        id: customerId
                    }
                }
            })
        })
        
        it("should return 400 for invalid uuid", async () => {
            
            let response = await apiServer.get(`/to-do/invalid-id`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NOT_UUID("toDoId")
            });
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.findFirst).toBeCalledTimes(0);
        })
        
        it("should return 404 for not found list for user", async () => {
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
            listMock.findFirst.mockResolvedValue(null as any)
            
            let response = await apiServer.get(`/to-do/${listId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({error: messages.NOT_FOUND, message: messages.TO_DO_LIST_NOT_FOUND});
            expect(customerMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findFirst).toBeCalledTimes(1);
            expect(listMock.findFirst).toBeCalledWith({
                include: {
                    customer: true,
                    items: true
                },
                where: {
                    id: listId,
                    customer: {
                        id: customerId
                    }
                }
            })
        })
        
    })
    
    describe("should test delete one controller", () => {
        
        let listId = "7ddea73e-f585-437b-a8f0-2ff008ce64b6"
        
        it("should return 401 if token is not informed", async () => {
            let response = await apiServer.delete(`/to-do/${listId}`);
            expect(response.status).toBe(401);
        })
        
        it("should return 401 if token is not Bearer", async () => {
            let response = await apiServer.delete(`/to-do/${listId}`).set({"Authorization": token});
            expect(response.status).toBe(401);
        })
        
        it("should return 200 for success", async () => {
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
            // @ts-ignore
            let listId = v4();
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
            listMock.findMany.mockResolvedValue([dbResponse] as any)
            listMock.delete.mockResolvedValue(null as any)
            
            let response = await apiServer.delete(`/to-do/${listId}`).set({"Authorization": tokenWithBearer});
            
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
            expect(listMock.delete).toHaveBeenCalledTimes(1)
            expect(listMock.delete).toHaveBeenCalledWith({where: {id: listId}})
        })
        
        it("should return 400 for invalid uuid", async () => {
            
            let response = await apiServer.delete(`/to-do/invalid-id`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NOT_UUID("toDoId")
            });
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.findFirst).toBeCalledTimes(0);
        })
        
        it("should return 404 for not found list for user", async () => {
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
            
            let response = await apiServer.delete(`/to-do/${listId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({error: messages.NOT_FOUND, message: messages.TO_DO_LIST_NOT_FOUND});
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
        })
        
    })
    
    describe("should test update one controller", () => {
        
        let listId = "7ddea73e-f585-437b-a8f0-2ff008ce64b6"
        
        it("should return 401 if token is not informed", async () => {
            let response = await apiServer.put(`/to-do/${listId}`);
            expect(response.status).toBe(401);
        })
        
        it("should return 401 if token is not Bearer", async () => {
            let response = await apiServer.put(`/to-do/${listId}`).set({"Authorization": token});
            expect(response.status).toBe(401);
        })
        
        it("should return 200 for success", async () => {
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
            // @ts-ignore
            let listId = v4();
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
            listMock.findMany.mockResolvedValue([dbResponse] as any)
            listMock.update.mockResolvedValue(null as any)
            
            let newName = "New name for to do list";
            let response = await apiServer.put(`/to-do/${listId}`).set({"Authorization": tokenWithBearer}).send({name: newName});
            
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
            expect(listMock.update).toHaveBeenCalledTimes(1)
            expect(listMock.update).toHaveBeenCalledWith({
                where: {
                    id: listId
                },
                data: {
                    name: newName,
                    updated_at: expect.any(Date)
                }
            })
        })
        
        it("should return 400 for invalid uuid", async () => {
            
            let response = await apiServer.put(`/to-do/invalid-id`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NOT_UUID("toDoId")
            });
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.findFirst).toBeCalledTimes(0);
        })
        
        it("should return 400 for null body", async () => {
            
            let response = await apiServer.put(`/to-do/${listId}`).set({"Authorization": tokenWithBearer});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("name")
            });
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.findFirst).toBeCalledTimes(0);
        })
        
        it("should return 400 for null name", async () => {
            
            let response = await apiServer.put(`/to-do/${listId}`).set({"Authorization": tokenWithBearer}).send({name: null});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("name")
            });
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.findFirst).toBeCalledTimes(0);
        })
        
        it("should return 400 for undefined name", async () => {
            
            let response = await apiServer.put(`/to-do/${listId}`).set({"Authorization": tokenWithBearer}).send({name: undefined});
            
            expect(response.status).toBe(400);
            expect(response.body).toStrictEqual({
                error: messages.INVALID_OBJECT,
                message: messages.FIELD_IS_NULL("name")
            });
            expect(customerMock.findFirst).toBeCalledTimes(0);
            expect(listMock.findFirst).toBeCalledTimes(0);
        })
        
        it("should return 404 for not found list for user", async () => {
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
            
            let response = await apiServer.put(`/to-do/${listId}`).set({"Authorization": tokenWithBearer}).send({name: "new name"});
            
            expect(response.status).toBe(404);
            expect(response.body).toStrictEqual({error: messages.NOT_FOUND, message: messages.TO_DO_LIST_NOT_FOUND});
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
            expect(listMock.update).toHaveBeenCalledTimes(0)
        })
        
    })
    
})