-- DropForeignKey
ALTER TABLE `notetag` DROP FOREIGN KEY `NoteTag_noteId_fkey`;

-- AddForeignKey
ALTER TABLE `NoteTag` ADD CONSTRAINT `NoteTag_noteId_fkey` FOREIGN KEY (`noteId`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
