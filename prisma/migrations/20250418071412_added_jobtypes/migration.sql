/*
  Warnings:

  - You are about to drop the `_jobtypesforjobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobtype` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULLTIME', 'REMOTE', 'INTERNSHIP', 'CONTRACT');

-- DropForeignKey
ALTER TABLE "_jobtypesforjobs" DROP CONSTRAINT "_jobtypesforjobs_A_fkey";

-- DropForeignKey
ALTER TABLE "_jobtypesforjobs" DROP CONSTRAINT "_jobtypesforjobs_B_fkey";

-- AlterTable
ALTER TABLE "jobschema" ADD COLUMN     "jobTypes" "JobType"[];

-- DropTable
DROP TABLE "_jobtypesforjobs";

-- DropTable
DROP TABLE "jobtype";
