-- DropForeignKey
ALTER TABLE `produtosconsumidos` DROP FOREIGN KEY `produtosConsumidos_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `servicosconsumidos` DROP FOREIGN KEY `servicosConsumidos_clienteId_fkey`;

-- AlterTable
ALTER TABLE `produtosconsumidos` MODIFY `clienteId` INTEGER NULL;

-- AlterTable
ALTER TABLE `servicosconsumidos` MODIFY `clienteId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `produtosConsumidos` ADD CONSTRAINT `produtosConsumidos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servicosConsumidos` ADD CONSTRAINT `servicosConsumidos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
