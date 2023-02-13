/*
  Warnings:

  - Added the required column `sumPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sumPrice` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "sumPrice" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "sumPrice",
ADD COLUMN     "sumPrice" MONEY NOT NULL;
