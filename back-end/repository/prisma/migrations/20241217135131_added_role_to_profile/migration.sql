-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
