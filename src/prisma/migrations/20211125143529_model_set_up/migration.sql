-- CreateTable
CREATE TABLE "Fish" (
    "id" SERIAL NOT NULL,
    "imguri" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Fish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Harbour" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Harbour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatedBy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logouri" TEXT NOT NULL,
    "homepage" TEXT NOT NULL,
    "imguri" TEXT NOT NULL,

    CONSTRAINT "TreatedBy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boat" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "freeze_trae" BOOLEAN NOT NULL,

    CONSTRAINT "Boat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishingTrip" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FishingTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Traceability" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Traceability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishingEquipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FishingEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fish_name_key" ON "Fish"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Harbour_name_key" ON "Harbour"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TreatedBy_name_key" ON "TreatedBy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Boat_name_key" ON "Boat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FishingEquipment_name_key" ON "FishingEquipment"("name");
