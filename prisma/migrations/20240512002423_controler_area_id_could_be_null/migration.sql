-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'EDITOR', 'VIEWER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roommate_requests" (
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roommate_requests_pkey" PRIMARY KEY ("sender_id","receiver_id")
);

-- CreateTable
CREATE TABLE "roommate" (
    "principal_roommate_id" TEXT NOT NULL,
    "secondary_roommate_id" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roommate_pkey" PRIMARY KEY ("principal_roommate_id","secondary_roommate_id")
);

-- CreateTable
CREATE TABLE "user_individual" (
    "userId" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "location" TEXT,

    CONSTRAINT "user_individual_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "area_type" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#F5F5F5',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "area_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area" (
    "id" TEXT NOT NULL,
    "creator_id" TEXT,
    "area_type_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_in_areas" (
    "user_id" TEXT NOT NULL,
    "area_id" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'VIEWER',
    "assigned_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_in_areas_pkey" PRIMARY KEY ("user_id","area_id")
);

-- CreateTable
CREATE TABLE "controller_type" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "controller_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controller" (
    "id" TEXT NOT NULL,
    "controller_type_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "area_id" TEXT,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "controller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_type" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL DEFAULT 'default',
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" TEXT NOT NULL,
    "device_type_id" TEXT NOT NULL,
    "controller_id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" INTEGER DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data" (
    "id" TEXT NOT NULL,
    "controller_id" TEXT,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_individual_userId_key" ON "user_individual"("userId");

-- CreateIndex
CREATE INDEX "user_individual_userId_idx" ON "user_individual"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "area_type_id_key" ON "area_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "area_id_key" ON "area"("id");

-- CreateIndex
CREATE UNIQUE INDEX "controller_type_id_key" ON "controller_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "controller_type_key_key" ON "controller_type"("key");

-- CreateIndex
CREATE UNIQUE INDEX "controller_id_key" ON "controller"("id");

-- CreateIndex
CREATE UNIQUE INDEX "device_type_id_key" ON "device_type"("id");

-- CreateIndex
CREATE UNIQUE INDEX "device_type_key_key" ON "device_type"("key");

-- CreateIndex
CREATE UNIQUE INDEX "device_id_key" ON "device"("id");

-- CreateIndex
CREATE UNIQUE INDEX "data_id_key" ON "data"("id");

-- CreateIndex
CREATE INDEX "data_controller_id_idx" ON "data"("controller_id");

-- AddForeignKey
ALTER TABLE "roommate_requests" ADD CONSTRAINT "roommate_requests_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roommate_requests" ADD CONSTRAINT "roommate_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roommate" ADD CONSTRAINT "roommate_principal_roommate_id_fkey" FOREIGN KEY ("principal_roommate_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roommate" ADD CONSTRAINT "roommate_secondary_roommate_id_fkey" FOREIGN KEY ("secondary_roommate_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_individual" ADD CONSTRAINT "user_individual_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_area_type_id_fkey" FOREIGN KEY ("area_type_id") REFERENCES "area_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_in_areas" ADD CONSTRAINT "users_in_areas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_in_areas" ADD CONSTRAINT "users_in_areas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controller" ADD CONSTRAINT "controller_controller_type_id_fkey" FOREIGN KEY ("controller_type_id") REFERENCES "controller_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controller" ADD CONSTRAINT "controller_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controller" ADD CONSTRAINT "controller_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_device_type_id_fkey" FOREIGN KEY ("device_type_id") REFERENCES "device_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_controller_id_fkey" FOREIGN KEY ("controller_id") REFERENCES "controller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data" ADD CONSTRAINT "data_controller_id_fkey" FOREIGN KEY ("controller_id") REFERENCES "controller"("id") ON DELETE SET NULL ON UPDATE CASCADE;
