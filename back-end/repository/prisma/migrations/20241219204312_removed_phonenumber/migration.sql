/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profile_phoneNumber_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "phoneNumber";
