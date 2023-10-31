/*
  Warnings:

  - You are about to drop the column `order` on the `payments` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "order",
ADD COLUMN     "order_id" INTEGER NOT NULL;
