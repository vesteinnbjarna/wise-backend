/*
  Warnings:

  - Added the required column `treatedbyid` to the `Fishingtrip` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Fishingtrip_boatId_key";

-- DropIndex
DROP INDEX "Fishingtrip_fishId_key";

-- DropIndex
DROP INDEX "Fishingtrip_harbourId_key";

-- DropIndex
DROP INDEX "Fishingtrip_locationId_key";

-- AlterTable
ALTER TABLE "Fishingtrip" ADD COLUMN     "treatedbyid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Fishingtrip" ADD CONSTRAINT "Fishingtrip_treatedbyid_fkey" FOREIGN KEY ("treatedbyid") REFERENCES "Treatedby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
