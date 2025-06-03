-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phonenumber" DROP NOT NULL;

-- CreateTable
CREATE TABLE "GitHubProfile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "company" TEXT,
    "blog" TEXT,
    "publicRepos" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "following" INTEGER NOT NULL,
    "htmlUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GitHubProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "description" TEXT,
    "htmlUrl" TEXT NOT NULL,
    "stargazersCount" INTEGER NOT NULL,
    "forksCount" INTEGER NOT NULL,
    "language" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "fork" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GitHubProfile_username_key" ON "GitHubProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "GitHubProfile_userId_key" ON "GitHubProfile"("userId");

-- AddForeignKey
ALTER TABLE "GitHubProfile" ADD CONSTRAINT "GitHubProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "GitHubProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
