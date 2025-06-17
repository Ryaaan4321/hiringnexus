-- AlterTable
ALTER TABLE "User" ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "jobschema" ADD COLUMN     "languageRequirement" TEXT[] DEFAULT ARRAY[]::TEXT[];
