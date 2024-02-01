/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Note_authorId_fkey` ON `note`;

-- DropIndex
DROP INDEX `NoteTag_tagId_fkey` ON `notetag`;

-- DropIndex
DROP INDEX `Tag_authorId_fkey` ON `tag`;

-- AlterTable
ALTER TABLE `note` MODIFY `authorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tag` MODIFY `authorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
