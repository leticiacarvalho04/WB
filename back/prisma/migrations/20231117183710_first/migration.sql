/*
  Warnings:

  - Added the required column `clienteId` to the `telefone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cliente` DROP FOREIGN KEY `Cliente_telefoneId_fkey`;

-- AlterTable
ALTER TABLE `telefone` ADD COLUMN `clienteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `telefone` ADD CONSTRAINT `telefone_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
