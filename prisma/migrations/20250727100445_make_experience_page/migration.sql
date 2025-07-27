/*
  Warnings:

  - You are about to drop the column `accomplishment` on the `experience_page` table. All the data in the column will be lost.
  - You are about to drop the column `awards` on the `experience_page` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `experience_page` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `experience_page` table. All the data in the column will be lost.
  - Added the required column `category` to the `experience_page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `experience_page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `experience_page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `experience_page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "experience_page" DROP COLUMN "accomplishment",
DROP COLUMN "awards",
DROP COLUMN "experience",
DROP COLUMN "skills",
ADD COLUMN     "category" VARCHAR(255) NOT NULL,
ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "location" VARCHAR(255) NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
