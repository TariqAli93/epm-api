/*
  Warnings:

  - Added the required column `file_path` to the `maintenance_file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_path` to the `guarantee_file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_path` to the `insurance_file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_path` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_maintenance_file" (
    "maintenance_files_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "maintenanceId" INTEGER NOT NULL,
    CONSTRAINT "maintenance_file_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenance" ("maintenance_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_maintenance_file" ("file_name", "maintenanceId", "maintenance_files_id") SELECT "file_name", "maintenanceId", "maintenance_files_id" FROM "maintenance_file";
DROP TABLE "maintenance_file";
ALTER TABLE "new_maintenance_file" RENAME TO "maintenance_file";
CREATE TABLE "new_guarantee_file" (
    "guarantee_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "guaranteeId" INTEGER NOT NULL,
    CONSTRAINT "guarantee_file_guaranteeId_fkey" FOREIGN KEY ("guaranteeId") REFERENCES "guarantee" ("guarantee_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_guarantee_file" ("file_name", "guaranteeId", "guarantee_file_id") SELECT "file_name", "guaranteeId", "guarantee_file_id" FROM "guarantee_file";
DROP TABLE "guarantee_file";
ALTER TABLE "new_guarantee_file" RENAME TO "guarantee_file";
CREATE TABLE "new_insurance_file" (
    "insurance_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "insuranceId" INTEGER NOT NULL,
    CONSTRAINT "insurance_file_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance" ("insurance_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_insurance_file" ("file_name", "insuranceId", "insurance_file_id") SELECT "file_name", "insuranceId", "insurance_file_id" FROM "insurance_file";
DROP TABLE "insurance_file";
ALTER TABLE "new_insurance_file" RENAME TO "insurance_file";
CREATE TABLE "new_files" (
    "file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_start_date" TEXT,
    "file_end_date" TEXT,
    "sectionId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "files_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "files_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections" ("section_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_files" ("file_end_date", "file_id", "file_name", "file_start_date", "projectId", "sectionId") SELECT "file_end_date", "file_id", "file_name", "file_start_date", "projectId", "sectionId" FROM "files";
DROP TABLE "files";
ALTER TABLE "new_files" RENAME TO "files";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
