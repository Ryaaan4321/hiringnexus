/*
  Warnings:

  - Added the required column `experience` to the `jobschema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `jobschema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobschema" ADD COLUMN     "experience" INTEGER NOT NULL,
ADD COLUMN     "salary" INTEGER NOT NULL,
ADD COLUMN     "timestamps" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
