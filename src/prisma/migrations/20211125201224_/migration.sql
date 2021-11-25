/*
  Warnings:

  - You are about to drop the column `fishingEquipmentId` on the `Boat` table. All the data in the column will be lost.
  - You are about to drop the `FishingEquipment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[fishingequipmentId]` on the table `Boat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fishingequipmentId` to the `Boat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boat" DROP CONSTRAINT "Boat_fishingEquipmentId_fkey";

-- DropIndex
DROP INDEX "Boat_fishingEquipmentId_key";

-- AlterTable
ALTER TABLE "Boat" DROP COLUMN "fishingEquipmentId",
ADD COLUMN     "fishingequipmentId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "FishingEquipment";

-- CreateTable
CREATE TABLE "Fishingequipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Fishingequipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fishingequipment_name_key" ON "Fishingequipment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Boat_fishingequipmentId_key" ON "Boat"("fishingequipmentId");

-- AddForeignKey
ALTER TABLE "Boat" ADD CONSTRAINT "Boat_fishingequipmentId_fkey" FOREIGN KEY ("fishingequipmentId") REFERENCES "Fishingequipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
