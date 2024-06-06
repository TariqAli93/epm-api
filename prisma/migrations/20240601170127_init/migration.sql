-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_guarantee" (
    "guarantee_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "guarantee_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_guarantee" ("end_date", "guarantee_id", "projectId", "start_date") SELECT "end_date", "guarantee_id", "projectId", "start_date" FROM "guarantee";
DROP TABLE "guarantee";
ALTER TABLE "new_guarantee" RENAME TO "guarantee";
CREATE TABLE "new_sections" (
    "section_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "section_name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "sections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sections" ("projectId", "section_id", "section_name") SELECT "projectId", "section_id", "section_name" FROM "sections";
DROP TABLE "sections";
ALTER TABLE "new_sections" RENAME TO "sections";
CREATE TABLE "new_maintenance" (
    "maintenance_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "maintenance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_maintenance" ("end_date", "maintenance_id", "projectId", "start_date") SELECT "end_date", "maintenance_id", "projectId", "start_date" FROM "maintenance";
DROP TABLE "maintenance";
ALTER TABLE "new_maintenance" RENAME TO "maintenance";
CREATE TABLE "new_insurance" (
    "insurance_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "insurance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_insurance" ("end_date", "insurance_id", "projectId", "start_date") SELECT "end_date", "insurance_id", "projectId", "start_date" FROM "insurance";
DROP TABLE "insurance";
ALTER TABLE "new_insurance" RENAME TO "insurance";
PRAGMA foreign_key_check("guarantee");
PRAGMA foreign_key_check("sections");
PRAGMA foreign_key_check("maintenance");
PRAGMA foreign_key_check("insurance");
PRAGMA foreign_keys=ON;
