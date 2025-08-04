/*
  Warnings:

  - You are about to drop the column `messages` on the `contact_page` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `message` to the `contact_page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purpose` to the `contact_page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."contact_page" DROP COLUMN "messages",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "purpose" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "public"."Message";
