/*
  Warnings:

  - A unique constraint covering the columns `[boatId]` on the table `FishingTrip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `boatId` to the `FishingTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FishingTrip" ADD COLUMN     "boatId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FishingTrip_boatId_key" ON "FishingTrip"("boatId");

-- AddForeignKey
ALTER TABLE "FishingTrip" ADD CONSTRAINT "FishingTrip_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
