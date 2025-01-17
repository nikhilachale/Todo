/*
  Warnings:

  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `task` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Todo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_pkey",
DROP COLUMN "description",
DROP COLUMN "done",
DROP COLUMN "title",
DROP COLUMN "userid",
ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "task" TEXT NOT NULL,
ADD COLUMN     "tid" SERIAL NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("tid");
