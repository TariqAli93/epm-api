-- CreateTable
CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "projects" (
    "project_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "project_name" TEXT NOT NULL,
    "project_company" TEXT NOT NULL,
    "project_amount" BIGINT NOT NULL,
    "project_start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_end_date" DATETIME NOT NULL,
    "project_progress" INTEGER NOT NULL DEFAULT 0,
    "project_stops" INTEGER NOT NULL DEFAULT 0,
    "project_status" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "sections" (
    "section_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "section_name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "sections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "files" (
    "file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "sectionId" INTEGER NOT NULL,
    CONSTRAINT "files_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections" ("section_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "guarantee" (
    "guarantee_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "guarantee_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "guarantee_file" (
    "guarantee_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "guaranteeId" INTEGER NOT NULL,
    CONSTRAINT "guarantee_file_guaranteeId_fkey" FOREIGN KEY ("guaranteeId") REFERENCES "guarantee" ("guarantee_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "insurance" (
    "insurance_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "insurance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "insurance_file" (
    "insurance_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "insuranceId" INTEGER NOT NULL,
    CONSTRAINT "insurance_file_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance" ("insurance_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "maintenance" (
    "maintenance_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "maintenance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "maintenance_files" (
    "maintenance_files_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "maintenanceId" INTEGER NOT NULL,
    CONSTRAINT "maintenance_files_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenance" ("maintenance_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
