-- DropIndex
DROP INDEX "Transaction_date_idx";

-- CreateIndex
CREATE INDEX "Transaction_date_id_idx" ON "Transaction"("date" DESC, "id" DESC);
