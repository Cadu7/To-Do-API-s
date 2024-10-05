import {Customer, User} from "@prisma/client";

export interface ICompletedCustomer extends Customer {
    user: User;
}