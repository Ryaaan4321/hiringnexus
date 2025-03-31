/*
  Warnings:

  - You are about to drop the column `adminid` on the `jobschema` table. All the data in the column will be lost.
  - Added the required column `postedbyId` to the `jobschema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "jobschema" DROP CONSTRAINT "jobschema_adminid_fkey";

-- AlterTable
ALTER TABLE "jobschema" DROP COLUMN "adminid",
ADD COLUMN     "postedbyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "jobschema" ADD CONSTRAINT "jobschema_postedbyId_fkey" FOREIGN KEY ("postedbyId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
