/*
  Warnings:

  - Added the required column `fishingtripId` to the `Traceability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Traceability" ADD COLUMN     "fishingtripId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Traceability" ADD CONSTRAINT "Traceability_fishingtripId_fkey" FOREIGN KEY ("fishingtripId") REFERENCES "Fishingtrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
