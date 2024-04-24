/*
  Warnings:

  - Added the required column `slug` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `game` ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `background_image` VARCHAR(191) NULL,
    MODIFY `metacritic` INTEGER NULL,
    MODIFY `rating_top` INTEGER NULL;
