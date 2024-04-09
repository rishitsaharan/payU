/*
  Warnings:

  - You are about to drop the column `type` on the `OnRampTransactionsMerchant` table. All the data in the column will be lost.
  - Added the required column `transactionType` to the `OnRampTransactionsMerchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnRampTransactionsMerchant" DROP COLUMN "type",
ADD COLUMN     "transactionType" "transactionType" NOT NULL;
