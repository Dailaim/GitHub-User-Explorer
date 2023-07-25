/*
  Warnings:

  - You are about to drop the column `blog` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[githubID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `githubID` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_githubId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "blog",
DROP COLUMN "githubId",
ADD COLUMN     "githubID" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_githubID_key" ON "User"("githubID");
