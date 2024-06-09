-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_insurance_file" (
    "insurance_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "insuranceId" INTEGER NOT NULL,
    CONSTRAINT "insurance_file_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance" ("insurance_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_insurance_file" ("file_name", "insuranceId", "insurance_file_id") SELECT "file_name", "insuranceId", "insurance_file_id" FROM "insurance_file";
DROP TABLE "insurance_file";
ALTER TABLE "new_insurance_file" RENAME TO "insurance_file";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
