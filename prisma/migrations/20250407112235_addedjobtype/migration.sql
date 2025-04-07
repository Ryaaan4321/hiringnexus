-- Active: 1738294088252@@127.0.0.1@5432@postgres
-- CreateTable
CREATE TABLE "jobtype" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "jobtype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_jobtypesforjobs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_jobtypesforjobs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "jobtype_name_key" ON "jobtype"("name");

-- CreateIndex
CREATE INDEX "_jobtypesforjobs_B_index" ON "_jobtypesforjobs"("B");

-- AddForeignKey
ALTER TABLE "_jobtypesforjobs" ADD CONSTRAINT "_jobtypesforjobs_A_fkey" FOREIGN KEY ("A") REFERENCES "jobschema"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_jobtypesforjobs" ADD CONSTRAINT "_jobtypesforjobs_B_fkey" FOREIGN KEY ("B") REFERENCES "jobtype"("id") ON DELETE CASCADE ON UPDATE CASCADE;
