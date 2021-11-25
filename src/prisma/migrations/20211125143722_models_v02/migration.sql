/*
  Warnings:

  - You are about to drop the column `freeze_trae` on the `Boat` table. All the data in the column will be lost.
  - Added the required column `freeze_trawler` to the `Boat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boat" DROP COLUMN "freeze_trae",
ADD COLUMN     "freeze_trawler" BOOLEAN NOT NULL;
