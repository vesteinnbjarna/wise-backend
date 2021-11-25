/*
  Warnings:

  - A unique constraint covering the columns `[fishingEquipmentId]` on the table `Boat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fishingEquipmentId` to the `Boat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boat" ADD COLUMN     "fishingEquipmentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Boat_fishingEquipmentId_key" ON "Boat"("fishingEquipmentId");

-- AddForeignKey
ALTER TABLE "Boat" ADD CONSTRAINT "Boat_fishingEquipmentId_fkey" FOREIGN KEY ("fishingEquipmentId") REFERENCES "FishingEquipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
