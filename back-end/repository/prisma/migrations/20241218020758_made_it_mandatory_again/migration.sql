/*
  Warnings:

  - Made the column `locationId` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_locationId_fkey";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "locationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "LocationTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
