-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guarantee_file" (
    "guarantee_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "guaranteeId" INTEGER NOT NULL,
    CONSTRAINT "guarantee_file_guaranteeId_fkey" FOREIGN KEY ("guaranteeId") REFERENCES "guarantee" ("guarantee_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_guarantee_file" ("file_name", "guaranteeId", "guarantee_file_id") SELECT "file_name", "guaranteeId", "guarantee_file_id" FROM "guarantee_file";
DROP TABLE "guarantee_file";
ALTER TABLE "new_guarantee_file" RENAME TO "guarantee_file";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
