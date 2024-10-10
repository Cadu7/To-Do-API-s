import "reflect-metadata"
import {beforeEach, MockedObject, vi} from "vitest";
import {customer, list, user} from "../../app/repository/Prisma";
import {Prisma} from "@prisma/client";

vi.mock("../../app/repository/Prisma", () => ({
    user: {
        findFirst: vi.fn(),
        create: vi.fn()
    },
    list: {
        create: vi.fn(),
        findMany: vi.fn(),
        findFirst: vi.fn(),
        delete: vi.fn(),
    },
    customer: {
        findFirst: vi.fn(),
        create: vi.fn()
    }
}))

export const userMock: MockedObject<Prisma.UserDelegate> = vi.mocked(user);
export const customerMock: MockedObject<Prisma.CustomerDelegate> = vi.mocked(customer);
export const listMock: MockedObject<Prisma.ListDelegate> = vi.mocked(list);
beforeEach(() => vi.resetAllMocks())