/*
  Warnings:

  - You are about to drop the column `clienteId` on the `servico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_clienteId_fkey`;

-- AlterTable
ALTER TABLE `servico` DROP COLUMN `clienteId`;
