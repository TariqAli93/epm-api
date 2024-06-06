-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_projects" (
    "project_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "project_name" TEXT NOT NULL,
    "project_company" TEXT NOT NULL,
    "project_amount" TEXT NOT NULL,
    "project_start_date" TEXT NOT NULL,
    "project_end_date" TEXT NOT NULL,
    "project_progress" INTEGER NOT NULL DEFAULT 0,
    "project_stops" INTEGER NOT NULL DEFAULT 0,
    "project_status" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_projects" ("project_amount", "project_company", "project_end_date", "project_id", "project_name", "project_progress", "project_start_date", "project_status", "project_stops") SELECT "project_amount", "project_company", "project_end_date", "project_id", "project_name", "project_progress", "project_start_date", "project_status", "project_stops" FROM "projects";
DROP TABLE "projects";
ALTER TABLE "new_projects" RENAME TO "projects";
PRAGMA foreign_key_check("projects");
PRAGMA foreign_keys=ON;
