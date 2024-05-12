/*
  Warnings:

  - You are about to drop the column `created_at` on the `area_type` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `controller_type` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `controller_type` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `device_type` table. All the data in the column will be lost.
  - The primary key for the `roommate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `principal_roommate_id` on the `roommate` table. All the data in the column will be lost.
  - The primary key for the `user_individual` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `user_individual` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `user_individual` will be added. If there are existing duplicate values, this will fail.
  - Made the column `creator_id` on table `area` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `first_roommate_id` to the `roommate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_individual` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "area" DROP CONSTRAINT "area_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "controller" DROP CONSTRAINT "controller_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "roommate" DROP CONSTRAINT "roommate_principal_roommate_id_fkey";

-- DropForeignKey
ALTER TABLE "roommate" DROP CONSTRAINT "roommate_secondary_roommate_id_fkey";

-- DropForeignKey
ALTER TABLE "roommate_requests" DROP CONSTRAINT "roommate_requests_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "roommate_requests" DROP CONSTRAINT "roommate_requests_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "user_individual" DROP CONSTRAINT "user_individual_userId_fkey";

-- DropForeignKey
ALTER TABLE "users_in_areas" DROP CONSTRAINT "users_in_areas_user_id_fkey";

-- DropIndex
DROP INDEX "user_individual_userId_idx";

-- DropIndex
DROP INDEX "user_individual_userId_key";

-- AlterTable
ALTER TABLE "area" ALTER COLUMN "creator_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "area_type" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "controller_type" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "device" ALTER COLUMN "controller_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "device_type" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "roommate" DROP CONSTRAINT "roommate_pkey",
DROP COLUMN "principal_roommate_id",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "first_roommate_id" TEXT NOT NULL,
ADD CONSTRAINT "roommate_pkey" PRIMARY KEY ("first_roommate_id", "secondary_roommate_id");

-- AlterTable
ALTER TABLE "roommate_requests" ADD COLUMN     "canceled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user_individual" DROP CONSTRAINT "user_individual_pkey",
DROP COLUMN "userId",
ADD COLUMN     "location_hash" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "full_name" DROP NOT NULL,
ADD CONSTRAINT "user_individual_pkey" PRIMARY KEY ("user_id");

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE INDEX "user_id_idx" ON "user"("id");

-- CreateIndex
CREATE INDEX "controller_type_key_idx" ON "controller_type"("key");

-- CreateIndex
CREATE INDEX "device_type_key_idx" ON "device_type"("key");

-- CreateIndex
CREATE UNIQUE INDEX "user_individual_user_id_key" ON "user_individual"("user_id");

-- CreateIndex
CREATE INDEX "user_individual_user_id_idx" ON "user_individual"("user_id");

-- AddForeignKey
ALTER TABLE "roommate_requests" ADD CONSTRAINT "roommate_requests_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roommate_requests" ADD CONSTRAINT "roommate_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roommate" ADD CONSTRAINT "roommate_first_roommate_id_fkey" FOREIGN KEY ("first_roommate_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roommate" ADD CONSTRAINT "roommate_secondary_roommate_id_fkey" FOREIGN KEY ("secondary_roommate_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_individual" ADD CONSTRAINT "user_individual_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area" ADD CONSTRAINT "area_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_in_areas" ADD CONSTRAINT "users_in_areas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controller" ADD CONSTRAINT "controller_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
