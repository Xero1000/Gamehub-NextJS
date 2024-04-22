/*
  Warnings:

  - Made the column `background_image` on table `game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `metacritic` on table `game` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating_top` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `game` MODIFY `background_image` VARCHAR(191) NOT NULL,
    MODIFY `metacritic` INTEGER NOT NULL,
    MODIFY `rating_top` INTEGER NOT NULL;
