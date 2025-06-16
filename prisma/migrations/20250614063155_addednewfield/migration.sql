-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "canDeleteJob" BOOLEAN;

-- CreateIndex
CREATE INDEX "jobschema_jobTypes_idx" ON "jobschema"("jobTypes");

-- CreateIndex
CREATE INDEX "jobschema_experience_idx" ON "jobschema"("experience");

-- CreateIndex
CREATE INDEX "jobschema_salary_idx" ON "jobschema"("salary");
