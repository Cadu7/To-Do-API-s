import {PrismaClient} from '@prisma/client'

export const {list, user, customer} = new PrismaClient();