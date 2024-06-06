/*
  Warnings:

  - Added the required column `guarantee_number` to the `guarantee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guarantee" (
    "guarantee_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "guarantee_number" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "guarantee_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_guarantee" ("end_date", "guarantee_id", "projectId", "start_date") SELECT "end_date", "guarantee_id", "projectId", "start_date" FROM "guarantee";
DROP TABLE "guarantee";
ALTER TABLE "new_guarantee" RENAME TO "guarantee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
