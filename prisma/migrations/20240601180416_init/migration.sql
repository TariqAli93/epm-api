-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sections" (
    "section_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "section_name" TEXT NOT NULL,
    "section_file_count" INTEGER NOT NULL DEFAULT 1,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "sections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sections" ("projectId", "section_id", "section_name") SELECT "projectId", "section_id", "section_name" FROM "sections";
DROP TABLE "sections";
ALTER TABLE "new_sections" RENAME TO "sections";
PRAGMA foreign_key_check("sections");
PRAGMA foreign_keys=ON;
