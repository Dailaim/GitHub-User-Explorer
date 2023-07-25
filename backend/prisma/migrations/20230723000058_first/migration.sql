-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "githubId" INTEGER NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "apiUrl" TEXT NOT NULL,
    "htmlUrl" TEXT NOT NULL,
    "name" TEXT,
    "blog" TEXT,
    "location" TEXT,
    "email" TEXT,
    "publicRepos" INTEGER,
    "followers" INTEGER,
    "following" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");
