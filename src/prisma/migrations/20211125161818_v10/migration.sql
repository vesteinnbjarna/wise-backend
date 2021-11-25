/*
  Warnings:

  - A unique constraint covering the columns `[fishId]` on the table `FishingTrip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fishId` to the `FishingTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FishingTrip" ADD COLUMN     "fishId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FishingTrip_fishId_key" ON "FishingTrip"("fishId");

-- AddForeignKey
ALTER TABLE "FishingTrip" ADD CONSTRAINT "FishingTrip_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
