/*
  Warnings:

  - You are about to drop the column `image_url` on the `portfolio_page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "portfolio_page" DROP COLUMN "image_url",
ADD COLUMN     "earlier_image_url" TEXT,
ADD COLUMN     "recent_image_url" TEXT;
