-- CreateTable
CREATE TABLE "users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "projects" (
    "project_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "project_name" TEXT NOT NULL,
    "project_company" TEXT NOT NULL,
    "project_amount" REAL NOT NULL,
    "project_start_date" TEXT NOT NULL,
    "project_end_date" TEXT,
    "project_days" INTEGER DEFAULT 0,
    "project_progress" INTEGER NOT NULL DEFAULT 0,
    "project_stops" INTEGER NOT NULL DEFAULT 0,
    "project_status" INTEGER NOT NULL DEFAULT 0,
    "project_payment_status" INTEGER DEFAULT 0,
    "project_payment_date" TEXT,
    "project_payment_amount" TEXT,
    "project_payment_desc" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "installments" (
    "installment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "installment_date" TEXT,
    "installment_title" TEXT,
    "installment_amount" TEXT,
    "installment_paid" BOOLEAN NOT NULL DEFAULT false,
    "installment_due" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "installments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "project_change_orders" (
    "change_order_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "change_order_date" TEXT,
    "change_order_value" INTEGER,
    "change_order_cost" REAL,
    "projectId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "project_change_orders_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "company" (
    "company_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company_name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "company_files" (
    "company_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "company_files_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("company_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sections" (
    "section_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "section_name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "section_file_count" INTEGER NOT NULL DEFAULT 1,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "sections_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "files" (
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

-- CreateTable
CREATE TABLE "guarantee" (
    "guarantee_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "guarantee_number" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "guarantee_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "guarantee_file" (
    "guarantee_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "guaranteeId" INTEGER NOT NULL,
    CONSTRAINT "guarantee_file_guaranteeId_fkey" FOREIGN KEY ("guaranteeId") REFERENCES "guarantee" ("guarantee_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "insurance" (
    "insurance_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "insurance_number" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "insurance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "insurance_file" (
    "insurance_file_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "insuranceId" INTEGER NOT NULL,
    CONSTRAINT "insurance_file_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "insurance" ("insurance_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "maintenance" (
    "maintenance_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "maintenance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("project_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "maintenance_file" (
    "maintenance_files_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "maintenanceId" INTEGER NOT NULL,
    CONSTRAINT "maintenance_file_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "maintenance" ("maintenance_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
