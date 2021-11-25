/*
  Warnings:

  - A unique constraint covering the columns `[locationId]` on the table `FishingTrip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `FishingTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FishingTrip" ADD COLUMN     "locationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FishingTrip_locationId_key" ON "FishingTrip"("locationId");

-- AddForeignKey
ALTER TABLE "FishingTrip" ADD CONSTRAINT "FishingTrip_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
