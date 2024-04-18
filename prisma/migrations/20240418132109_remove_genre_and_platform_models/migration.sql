/*
  Warnings:

  - You are about to drop the `gamegenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gameplatform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `platform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `gamegenre` DROP FOREIGN KEY `GameGenre_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `gamegenre` DROP FOREIGN KEY `GameGenre_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `gameplatform` DROP FOREIGN KEY `GamePlatform_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `gameplatform` DROP FOREIGN KEY `GamePlatform_platformId_fkey`;

-- AlterTable
ALTER TABLE `game` MODIFY `background_image` VARCHAR(191) NULL,
    MODIFY `metacritic` INTEGER NULL,
    MODIFY `rating_top` INTEGER NULL;

-- DropTable
DROP TABLE `gamegenre`;

-- DropTable
DROP TABLE `gameplatform`;

-- DropTable
DROP TABLE `genre`;

-- DropTable
DROP TABLE `platform`;
