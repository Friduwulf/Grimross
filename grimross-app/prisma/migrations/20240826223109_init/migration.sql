-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gyle" TEXT NOT NULL,
    "dateBrewed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEmpty" DATETIME NOT NULL,
    "volumeWart" INTEGER NOT NULL,
    "volumePackaged" INTEGER NOT NULL,
    "packaged20L" INTEGER NOT NULL,
    "packaged473ml" INTEGER NOT NULL,
    "packaged50L" INTEGER NOT NULL,
    "packaged60L" INTEGER NOT NULL,
    "productID" TEXT NOT NULL,
    CONSTRAINT "Batch_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "productionTime" INTEGER NOT NULL,
    "inventory_20L" INTEGER NOT NULL,
    "inventory_473ml" INTEGER NOT NULL,
    "available_20L" BOOLEAN NOT NULL DEFAULT false,
    "available_473ml" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhoneNumber" INTEGER NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "poNumber" TEXT NOT NULL,
    "customerID" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    CONSTRAINT "Order_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Batch_gyle_key" ON "Batch"("gyle");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_name_key" ON "Customer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Order_poNumber_key" ON "Order"("poNumber");
