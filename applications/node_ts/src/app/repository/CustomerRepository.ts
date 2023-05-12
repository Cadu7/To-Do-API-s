import {customer} from "./Prisma";
import {Customer} from "@prisma/client";
import {v4} from "uuid";

export class CustomerRepository {

  async createNewCostumer(userId: string): Promise<Customer> {
    return customer.create({
      data: {
        id: v4(),
        created_at: new Date(),
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

  findCustomerByUserName(userName: string): Promise<Customer | null> {
    return customer.findFirst({
      include: {
        user: true
      },
      where: {
        user: {
          email: userName
        }
      }
    });
  }
}