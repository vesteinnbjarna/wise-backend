/*
  Warnings:

  - A unique constraint covering the columns `[harbourId]` on the table `FishingTrip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `harbourId` to the `FishingTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FishingTrip" ADD COLUMN     "harbourId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FishingTrip_harbourId_key" ON "FishingTrip"("harbourId");

-- AddForeignKey
ALTER TABLE "FishingTrip" ADD CONSTRAINT "FishingTrip_harbourId_fkey" FOREIGN KEY ("harbourId") REFERENCES "Harbour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
