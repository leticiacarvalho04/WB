/*
  Warnings:

  - You are about to drop the column `cadastroData` on the `produto` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Cliente_telefoneId_fkey` ON `cliente`;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `cadastroData`,
    ADD COLUMN `descricao` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantidadeEstoque` INTEGER NOT NULL DEFAULT 0,
    MODIFY `preco` INTEGER NOT NULL DEFAULT 30;
