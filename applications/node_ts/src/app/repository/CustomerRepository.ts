import {customer} from "./Prisma";
import {Customer} from "@prisma/client";
import {v4} from "uuid";
import {ICompletedCustomer} from "../model/ICompletedCustomer";

export class CustomerRepository {
    
    async create(userId: string, userName: string): Promise<Customer> {
        return customer.create({
            data: {
                id: v4(),
                created_at: new Date(),
                name: userName,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                user: true
            }
        })
    }
    
    
    findCustomerByEmail(email: string): Promise<ICompletedCustomer | null> {
        return customer.findFirst({
            include: {
                user: true
            },
            where: {
                user: {
                    email: email
                }
            }
        });
    }
}