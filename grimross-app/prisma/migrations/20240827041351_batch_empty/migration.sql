-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Batch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gyle" TEXT NOT NULL,
    "dateBrewed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isEmpty" BOOLEAN NOT NULL DEFAULT false,
    "volumeWart" INTEGER NOT NULL,
    "volumePackaged" INTEGER NOT NULL,
    "packaged20L" INTEGER NOT NULL,
    "packaged473ml" INTEGER NOT NULL,
    "packaged50L" INTEGER NOT NULL,
    "packaged60L" INTEGER NOT NULL,
    "productID" TEXT NOT NULL,
    CONSTRAINT "Batch_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Batch" ("dateBrewed", "gyle", "id", "isEmpty", "packaged20L", "packaged473ml", "packaged50L", "packaged60L", "productID", "volumePackaged", "volumeWart") SELECT "dateBrewed", "gyle", "id", "isEmpty", "packaged20L", "packaged473ml", "packaged50L", "packaged60L", "productID", "volumePackaged", "volumeWart" FROM "Batch";
DROP TABLE "Batch";
ALTER TABLE "new_Batch" RENAME TO "Batch";
CREATE UNIQUE INDEX "Batch_gyle_key" ON "Batch"("gyle");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
