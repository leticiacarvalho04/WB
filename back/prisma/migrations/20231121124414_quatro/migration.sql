-- DropForeignKey
ALTER TABLE `rg` DROP FOREIGN KEY `RG_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `telefone` DROP FOREIGN KEY `telefone_clienteId_fkey`;

-- AlterTable
ALTER TABLE `cliente` MODIFY `telefoneId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rg` MODIFY `clienteId` INTEGER NULL;

-- AlterTable
ALTER TABLE `telefone` MODIFY `clienteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `telefone` ADD CONSTRAINT `telefone_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RG` ADD CONSTRAINT `RG_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
