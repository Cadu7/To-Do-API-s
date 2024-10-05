-- CreateTable
CREATE TABLE IF NOT EXISTS "user" (
    id       UUID PRIMARY KEY ,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "customer" (
    id         UUID           PRIMARY KEY,
    created_at TIMESTAMP(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user"     UUID           NOT NULL REFERENCES "user"(id),
    name       VARCHAR(255)   NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "list" (
    id          uuid         PRIMARY KEY ,
    name        TEXT         NOT NULL,
    created_at  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP(3) NOT NULL,
    customer    UUID         REFERENCES "customer"(id)
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "item" (
    id            UUID     PRIMARY KEY ,
    content       TEXT     NOT NULL,
    done          BOOLEAN  NOT NULL DEFAULT false,
    to_do_list    UUID     REFERENCES "list"(id)
);

