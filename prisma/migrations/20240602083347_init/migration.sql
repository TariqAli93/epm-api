/*
  Warnings:

  - Added the required column `projectId` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_files" (
    "file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "files_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "files_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections" ("section_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_files" ("file_id", "file_name", "sectionId") SELECT "file_id", "file_name", "sectionId" FROM "files";
DROP TABLE "files";
ALTER TABLE "new_files" RENAME TO "files";
PRAGMA foreign_key_check("files");
PRAGMA foreign_keys=ON;
