-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `notetag` DROP FOREIGN KEY `NoteTag_noteId_fkey`;

-- DropForeignKey
ALTER TABLE `notetag` DROP FOREIGN KEY `NoteTag_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `tag` DROP FOREIGN KEY `Tag_authorId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `authMethod` ENUM('LOCAL', 'GOOGLE') NOT NULL DEFAULT 'LOCAL',
    ADD COLUMN `photoUrl` VARCHAR(191) NULL,
    MODIFY `hashedPassword` VARCHAR(191) NULL;
