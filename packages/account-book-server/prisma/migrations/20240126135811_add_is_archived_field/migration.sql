-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FinancialSource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "FinancialSource_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FinancialSource" ("accountId", "id", "name", "type") SELECT "accountId", "id", "name", "type" FROM "FinancialSource";
DROP TABLE "FinancialSource";
ALTER TABLE "new_FinancialSource" RENAME TO "FinancialSource";
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "defaultCategory" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Category_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("accountId", "defaultCategory", "id", "name", "type") SELECT "accountId", "defaultCategory", "id", "name", "type" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
