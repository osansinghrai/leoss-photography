/*
  Warnings:

  - You are about to drop the column `image_public_id` on the `portfolio_page` table. All the data in the column will be lost.
  - Added the required column `earlier_image_public_id` to the `portfolio_page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recent_image_public_id` to the `portfolio_page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "portfolio_page" DROP COLUMN "image_public_id",
ADD COLUMN     "earlier_image_public_id" TEXT NOT NULL,
ADD COLUMN     "recent_image_public_id" TEXT NOT NULL;
