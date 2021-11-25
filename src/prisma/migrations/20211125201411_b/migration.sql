/*
  Warnings:

  - You are about to drop the `TreatedBy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TreatedBy";

-- CreateTable
CREATE TABLE "Treatedby" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logouri" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "imguri" TEXT NOT NULL,

    CONSTRAINT "Treatedby_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Treatedby_name_key" ON "Treatedby"("name");
