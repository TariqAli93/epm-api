/*
  Warnings:

  - Added the required column `insurance_number` to the `insurance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_insurance" (
    "insurance_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "insurance_number" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "insurance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_insurance" ("end_date", "insurance_id", "projectId", "start_date") SELECT "end_date", "insurance_id", "projectId", "start_date" FROM "insurance";
DROP TABLE "insurance";
ALTER TABLE "new_insurance" RENAME TO "insurance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
