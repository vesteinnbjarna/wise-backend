/*
  Warnings:

  - You are about to drop the `FishingTrip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FishingTrip" DROP CONSTRAINT "FishingTrip_boatId_fkey";

-- DropForeignKey
ALTER TABLE "FishingTrip" DROP CONSTRAINT "FishingTrip_fishId_fkey";

-- DropForeignKey
ALTER TABLE "FishingTrip" DROP CONSTRAINT "FishingTrip_harbourId_fkey";

-- DropForeignKey
ALTER TABLE "FishingTrip" DROP CONSTRAINT "FishingTrip_locationId_fkey";

-- DropTable
DROP TABLE "FishingTrip";

-- CreateTable
CREATE TABLE "Fishingtrip" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "fishId" INTEGER NOT NULL,
    "boatId" INTEGER NOT NULL,
    "harbourId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Fishingtrip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fishingtrip_fishId_key" ON "Fishingtrip"("fishId");

-- CreateIndex
CREATE UNIQUE INDEX "Fishingtrip_boatId_key" ON "Fishingtrip"("boatId");

-- CreateIndex
CREATE UNIQUE INDEX "Fishingtrip_harbourId_key" ON "Fishingtrip"("harbourId");

-- CreateIndex
CREATE UNIQUE INDEX "Fishingtrip_locationId_key" ON "Fishingtrip"("locationId");

-- AddForeignKey
ALTER TABLE "Fishingtrip" ADD CONSTRAINT "Fishingtrip_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fishingtrip" ADD CONSTRAINT "Fishingtrip_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "Boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fishingtrip" ADD CONSTRAINT "Fishingtrip_harbourId_fkey" FOREIGN KEY ("harbourId") REFERENCES "Harbour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fishingtrip" ADD CONSTRAINT "Fishingtrip_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
