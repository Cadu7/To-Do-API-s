import {PrismaClient} from '@prisma/client'

export const {toDoList, user, customer} = new PrismaClient();