/*import { PrismaClient, Cliente } from '@prisma/client'
import readline from 'readline';

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function cadastrarCliente() {
  console.log(`\nInício do cadastro do cliente`);

  let nome = await question(`Por favor informe o nome do cliente: `);
  let nomeSocial = await question(`Por favor informe o nome social do cliente: `);
  let genero = await question(`Por favor, informe seu gênero (masculino/feminino): `);
  let cpf = await question(`Por favor informe o número do cpf: `);
  let dataEmissao = await question(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);

  // Convertendo a data de emissão para um objeto Date
  let dataEmissaoDate = new Date(Date.parse(dataEmissao));

  let cliente = {
    nome: nome,
    nomeSocial: nomeSocial,
    genero: genero,
    cpf: cpf,
    dataEmissao: dataEmissaoDate
    // Adicione aqui outros campos conforme necessário
  }

  await prisma.cliente.create({
    data: cliente
  })

  console.log(`\nCadastro concluído :)\n`);
  rl.close();
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

cadastrarCliente();*/