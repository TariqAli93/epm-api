/*
  Warnings:

  - You are about to drop the `maintenance_files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "maintenance_files";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "maintenance_file" (
    "maintenance_files_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "maintenanceId" INTEGER NOT NULL,
    CONSTRAINT "maintenance_file_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenance" ("maintenance_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
