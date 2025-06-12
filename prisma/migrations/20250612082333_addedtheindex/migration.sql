-- CreateIndex
CREATE INDEX "Admin_id_idx" ON "Admin"("id");

-- CreateIndex
CREATE INDEX "GitHubProfile_id_username_userId_idx" ON "GitHubProfile"("id", "username", "userId");

-- CreateIndex
CREATE INDEX "Repository_name_language_profileId_idx" ON "Repository"("name", "language", "profileId");

-- CreateIndex
CREATE INDEX "User_username_email_idx" ON "User"("username", "email");

-- CreateIndex
CREATE INDEX "jobschema_timestamps_idx" ON "jobschema"("timestamps");
