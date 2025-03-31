/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UserTojobschema` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `jobschema` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_UserTojobschema" DROP CONSTRAINT "_UserTojobschema_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTojobschema" DROP CONSTRAINT "_UserTojobschema_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_UserTojobschema" DROP CONSTRAINT "_UserTojobschema_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT,
ADD CONSTRAINT "_UserTojobschema_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "jobschema" DROP CONSTRAINT "jobschema_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "jobschema_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "jobschema_id_seq";

-- AddForeignKey
ALTER TABLE "_UserTojobschema" ADD CONSTRAINT "_UserTojobschema_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTojobschema" ADD CONSTRAINT "_UserTojobschema_B_fkey" FOREIGN KEY ("B") REFERENCES "jobschema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
