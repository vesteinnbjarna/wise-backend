/*
  Warnings:

  - Added the required column `imguri` to the `Boat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boat" ADD COLUMN     "imguri" TEXT NOT NULL;
