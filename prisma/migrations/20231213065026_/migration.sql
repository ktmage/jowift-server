-- DropForeignKey
ALTER TABLE `notetag` DROP FOREIGN KEY `NoteTag_tagId_fkey`;

-- AddForeignKey
ALTER TABLE `NoteTag` ADD CONSTRAINT `NoteTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
