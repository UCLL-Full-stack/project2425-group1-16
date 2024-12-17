/*
  Warnings:

  - You are about to drop the column `location_id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `Loan` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `LocationTag` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `Loan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Loan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `LocationTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_item_id_fkey";

-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_location_id_fkey";

-- DropIndex
DROP INDEX "Loan_item_id_key";

-- DropIndex
DROP INDEX "Loan_profile_id_key";

-- DropIndex
DROP INDEX "Profile_phone_number_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "location_id",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "item_id",
DROP COLUMN "profile_id",
ADD COLUMN     "itemId" INTEGER NOT NULL,
ADD COLUMN     "profileId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LocationTag" DROP COLUMN "display_name",
ADD COLUMN     "displayName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "location_id",
DROP COLUMN "phone_number",
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Loan_itemId_key" ON "Loan"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_profileId_key" ON "Loan"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_phoneNumber_key" ON "Profile"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "LocationTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "LocationTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
