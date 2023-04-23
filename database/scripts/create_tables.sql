-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "to_do_item" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "to_do" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN,
    "deleted_date" TIMESTAMP(3),
    "images_id" TEXT,
    "to_do_list_id" TEXT,

    CONSTRAINT "to_do_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "to_do_list" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT,

    CONSTRAINT "to_do_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "content" BYTEA NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "to_do_item" ADD CONSTRAINT "to_do_item_images_id_fkey" FOREIGN KEY ("images_id") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "to_do_item" ADD CONSTRAINT "to_do_item_to_do_list_id_fkey" FOREIGN KEY ("to_do_list_id") REFERENCES "to_do_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "to_do_list" ADD CONSTRAINT "to_do_list_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
