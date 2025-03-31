-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobschema" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descreption" TEXT NOT NULL,
    "joblink" TEXT NOT NULL,
    "adminid" TEXT NOT NULL,

    CONSTRAINT "jobschema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserTojobschema" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserTojobschema_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "_UserTojobschema_B_index" ON "_UserTojobschema"("B");

-- AddForeignKey
ALTER TABLE "jobschema" ADD CONSTRAINT "jobschema_adminid_fkey" FOREIGN KEY ("adminid") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTojobschema" ADD CONSTRAINT "_UserTojobschema_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTojobschema" ADD CONSTRAINT "_UserTojobschema_B_fkey" FOREIGN KEY ("B") REFERENCES "jobschema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
