import { Request, Response } from 'express';
import { connect } from 'http2';
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
router.use(cors());

const prisma = new PrismaClient();
router.use(express.json());

// CADASTROS //

router.post('/cpf', async (req: Request, res: Response) => {
  const { valor, dataEmissao } = req.body;
  const cpf = await prisma.CPF.create({
    data: {
      valor: valor,
      dataEmissao: new Date(dataEmissao),
    },
  });
  res.json(cpf);
});

// Cadastrar cliente
router.post('/cadastroCliente', async (req: Request, res: Response) => {
  const { nome, nomeSocial, genero, cpfValor, empresaId } = req.body;
  const cliente = await prisma.cliente.create({
    data: {
      nome,
      nomeSocial,
      genero,
      cpfValor,
      empresaId,
    },
  });
  res.json(cliente);
});

router.post('/rg', async (req: Request, res: Response) => {
  const { valor, dataEmissao, clienteId } = req.body;
  const rg = await prisma.RG.create({
    data: {
      valor,
      dataEmissao: new Date(dataEmissao),
      clienteId,
    },
  });
  res.json(rg);
});

router.post('/telefone', async (req: Request, res: Response) => {
  const { ddd, numero, clienteId } = req.body;
  const telefone = await prisma.telefone.create({
    data: {
      ddd,
      numero,
      clienteId,
    },
  });
  res.json(telefone);
});

router.post('/cadastroPro', async (req: Request, res: Response) => {
  const { nome, descricao, preco, quantidadeEstoque } = req.body
  try {
    const novoProduto = await prisma.produto.create({
      data: {
        nome: nome,
        descricao: descricao,
        preco: preco,
        quantidadeEstoque: quantidadeEstoque,
        empresa: {
          connect: {
            id: 1
          }
        }
      },
    });
    console.log(novoProduto);
    res.json(novoProduto);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})

router.post('/cadastroServ', async (req: Request, res: Response) => {
  const { name, price, descricao } = req.body
  console.log(name)
  console.log(descricao)
  console.log(price)
  try {
    const novoServico = await prisma.servico.create({
      data: {
        name: name,
        descricao: descricao,
        price: price,
        empresa: {
          connect: {
            id: 1
          }
        }
      },
    });
    console.log(novoServico);
    res.json(novoServico);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})

// ATUALIZAÇÕES //
// Rota para atualizar um cliente pelo id
router.put('/clientes/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, nomeSocial, genero, cpfValor, rg, ddd, telefone, dataCadastro } = req.body;

  try {
    // Atualiza o CPF do cliente
    await prisma.CPF.upsert({
      where: { valor: cpfValor },
      update: { dataEmissao: new Date() },
      create: {
        valor: cpfValor,
        dataEmissao: new Date(),
      },
    });

    // Atualiza os RGs do cliente
    if (rg && rg.length > 0) {
      await prisma.RG.deleteMany({ where: { clienteId: parseInt(id) } });
      const rgObjects = rg.map((rgItem: any) => ({ valor: rgItem.valor, dataEmissao: new Date(rgItem.dataEmissao), clienteId: parseInt(id) }));
      await prisma.RG.createMany({ data: rgObjects });
    }

    // Atualiza os telefones do cliente
    if (telefone && telefone.length > 0) {
      await prisma.telefone.deleteMany({ where: { clienteId: parseInt(id) } });
      const telefoneObjects = telefone.map((telefoneItem: any) => ({ numero: telefoneItem.numero, ddd: telefoneItem.ddd, clienteId: parseInt(id) }));
      await prisma.telefone.createMany({ data: telefoneObjects });
    }

    const updatedCliente = await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: {
        nome: nome,
        nomeSocial: nomeSocial,
        genero: genero,
        cpfValor: cpfValor,
        dataCadastro: dataCadastro
      },
    });

    res.json(updatedCliente);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Rota para atualizar um cliente pelo nome
router.put('/clientes/nome/:nome', async (req: Request, res: Response) => {
  const { nome } = req.params;
  const { novoNome, nomeSocial, genero, telefone, ddd, numeroTelefone, cpfValor, rgValor, empresaId } = req.body;

  try {
    const cliente = await prisma.cliente.findFirst({
      where: { nome: nome },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Atualiza o CPF do cliente
    await prisma.CPF.upsert({
      where: { valor: cpfValor },
      update: { dataEmissao: new Date() },
      create: {
        valor: cpfValor,
        dataEmissao: new Date(),
      },
    });

    // Atualiza os RGs do cliente
    await prisma.RG.upsert({
      where: { valor: rgValor },
      update: { dataEmissao: new Date() },
      create: {
        valor: rgValor,
        dataEmissao: new Date(),
      },
    });

    // Atualiza os telefones do cliente
    if (telefone && telefone.length > 0) {
      await prisma.telefone.deleteMany({ where: { clienteId: parseInt(cliente.id) } });
      const telefoneObjects = telefone.map((telefoneItem: any) => ({ numero: telefoneItem.numero, ddd: telefoneItem.ddd, clienteId: parseInt(cliente.id) }));
      await prisma.telefone.create({ data: { telefoneObjects } });
    }

    const updatedCliente = await prisma.cliente.update({
      where: { id: cliente.id },
      data: {
        nome: novoNome,
        nomeSocial: nomeSocial,
        genero: genero,
        cpfValor: cpfValor,
        empresaId: empresaId
      },
    });

    res.json(updatedCliente);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Atualizar o cliente pelo cpf
router.put('/clientes/cpf/:cpfValor', async (req: Request, res: Response) => {
  const { cpfValor } = req.params;
  const { novoNome, nomeSocial, genero, telefone, rgValor } = req.body; // Mudança no nome da variável para coincidir com o formulário

  try {
    const cliente = await prisma.cliente.findFirst({
      where: { cpfValor: cpfValor },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Atualiza o CPF do cliente
    await prisma.CPF.upsert({
      where: { valor: cpfValor },
      update: { dataEmissao: new Date() },
      create: {
        valor: cpfValor,
        dataEmissao: new Date(),
      },
    });

    // Atualiza os RGs do cliente
    await prisma.RG.upsert({
      where: { valor: rgValor },
      update: { dataEmissao: new Date() },
      create: {
        valor: rgValor,
        dataEmissao: new Date(),
      },
    });

    // Atualiza os telefones do cliente
    if (telefone && telefone.length > 0) {
      await prisma.telefone.deleteMany({ where: { clienteId: parseInt(cliente.id) } });
      const telefoneObjects = telefone.map((telefoneItem: any) => ({ numero: telefoneItem.numero, ddd: telefoneItem.ddd, clienteId: parseInt(cliente.id) }));
      await prisma.telefone.createMany({ data: telefoneObjects });
    }

    const updatedCliente = await prisma.cliente.update({
      where: { id: cliente.id },
      data: {
        nome: novoNome,
        nomeSocial: nomeSocial,
        genero: genero,
        cpfValor: cpfValor,
        empresaId: 1
      },
    });

    res.json(updatedCliente);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Atualiza um serviço pelo ID
router.put('/servico/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, descricao, preco } = req.body;

  try {
    const servico = await prisma.Servico.upsert({
      where: { id: Number(id) },
      update: { name: name, descricao: descricao, price: preco, empresaId: 1 },
      create: { name: name, descricao: descricao, price: preco, empresaId: 1 },
    });

    console.log(servico)
    res.json(servico);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// Atualiza um serviço pelo nome
router.put('/servico/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, descricao, price } = req.body;

  try {
    const servico = await prisma.Servico.upsert({
      where: { id: Number(id) },
      update: { name, descricao, price, empresaId: 1 },
      create: { name, descricao, price, empresaId: 1 },
    });

    console.log(servico);
    res.json(servico);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Atualiza um produto pelo ID
router.put('/produto/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidadeEstoque } = req.body;

  try {
    const produto = await prisma.Produto.upsert({
      where: { id: Number(id) },
      update: { nome: nome, descricao: descricao, preco: preco, quantidadeEstoque: quantidadeEstoque, empresaId: 1 },
      create: { nome: nome, descricao: descricao, preco: preco, quantidadeEstoque: quantidadeEstoque, empresaId: 1 },
    });

    console.log(produto)
    res.json(produto);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// Atualiza um produto pelo nome
router.put('/produto/nome/:nome', async (req: Request, res: Response) => {
  const { nome } = req.params;
  const { novoNome, descricao, preco, quantidadeEstoque, empresaId } = req.body;

  try {
    const produto = await prisma.Produto.upsert({
      where: { nome: nome },
      update: { nome: novoNome, descricao: descricao, preco: preco, quantidadeEstoque: quantidadeEstoque, empresaId: empresaId },
      create: { nome: novoNome, descricao: descricao, preco: preco, quantidadeEstoque: quantidadeEstoque, empresaId: empresaId }
    });

    res.json(produto);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// DELETE //
// Deleta um cliente pelo id
router.delete('/clientes/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Deleta o cliente
    await prisma.cliente.delete({
      where: { id: cliente.id },
    });

    // Deleta o CPF, RGs e telefones do cliente
    await prisma.CPF.delete({ where: { valor: cliente.cpfValor } });
    await prisma.RG.deleteMany({ where: { clienteId: cliente.id } });
    await prisma.telefone.deleteMany({ where: { clienteId: cliente.id } });

    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Deletar cliente pelo nome
router.delete('/clientes/nome/:nome', async (req: Request, res: Response) => {
  const { nome } = req.params;

  try {
    const cliente = await prisma.cliente.findFirst({
      where: { nome: nome },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Deleta o cliente
    await prisma.cliente.delete({
      where: { id: cliente.id },
    });

    // Deleta o CPF, RGs e telefones do cliente
    await prisma.CPF.delete({ where: { valor: cliente.cpfValor } });
    await prisma.RG.deleteMany({ where: { clienteId: cliente.id } });
    await prisma.telefone.deleteMany({ where: { clienteId: cliente.id } });

    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Deletar por CPF
router.delete('/clientes/cpf/:cpfValor', async (req: Request, res: Response) => {
  const { cpfValor } = req.params;

  try {
    const cliente = await prisma.cliente.findFirst({
      where: { cpfValor: cpfValor },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Deleta o cliente
    await prisma.cliente.delete({
      where: { id: cliente.id },
    });

    // Deleta o CPF, RGs e telefones do cliente
    await prisma.CPF.delete({ where: { valor: cliente.cpfValor } });
    await prisma.RG.deleteMany({ where: { clienteId: cliente.id } });
    await prisma.telefone.deleteMany({ where: { clienteId: cliente.id } });

    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Deletar SERVIÇO por id
router.delete('/servicos/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const servico = await prisma.servico.findUnique({
      where: { id: parseInt(id) },
    });

    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    // Primeiro, exclua todos os servicosConsumidos associados a este serviço
    await prisma.servicosConsumidos.deleteMany({
      where: { servicoId: servico.id },
    });

    // Agora você pode excluir o serviço
    await prisma.servico.delete({
      where: { id: servico.id },
    });

    res.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// deletar SERVIÇO pelo nome
router.delete('/servicos/nome/:name', async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const servico = await prisma.servico.findUnique({
      where: { name: name },
    });

    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    // Primeiro, exclua todos os servicosConsumidos associados a este serviço
    await prisma.servicosConsumidos.deleteMany({
      where: { servicoId: servico.id },
    });

    // Agora você pode excluir o serviço
    await prisma.servico.delete({
      where: { id: servico.id },
    });

    res.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Deletar PRODUTO por id
router.delete('/produto/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!produto) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    // Primeiro, exclua todos os produtosConsumidos associados a este serviço
    await prisma.produtosConsumidos.deleteMany({
      where: { produtoId: produto.id },
    });

    // Agora você pode excluir o serviço
    await prisma.produto.delete({
      where: { id: produto.id },
    });

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// deletar PRODUTO pelo nome
router.delete('/produto/nome/:name', async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const produto = await prisma.produto.findUnique({
      where: { name: name },
    });

    if (!produto) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    // Primeiro, exclua todos os produtoConsumidos associados a este serviço
    await prisma.produtoConsumidos.deleteMany({
      where: { produtoId: produto.id },
    });

    // Agora você pode excluir o serviço
    await prisma.produto.delete({
      where: { id: produto.id },
    });

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Rota para buscar um PRODUTO pelo id
router.get('/produtos/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(produto);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Rota para buscar um PRODUTO pelo nome
router.get('/produtos/nome/:name', async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const produto = await prisma.produto.findUnique({
      where: { nome: name },
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(produto);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// COMPRAR //
// Cadastrar a compra PRODUTO no cliente pelo id
router.post('/cliente/id/:id/produto', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { produtoId } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const produto = await prisma.produto.findUnique({
      where: { id: Number(produtoId) },
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const produtoConsumido = await prisma.produtosConsumidos.create({
      data: {
        clienteId: Number(id),
        produtoId: Number(produtoId),
      },
    });

    return res.json(produtoConsumido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado' });
  }
});

// Cadastrar a compra PRODUTO no cliente pelo nome
router.post('/cliente/nome/:nome/produto', async (req: Request, res: Response) => {
  const { nome } = req.params;
  const { produtoId } = req.body;

  try {
    const cliente = await prisma.cliente.findFirst({
      where: { nome },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const produto = await prisma.produto.findUnique({
      where: { id: Number(produtoId) },
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const produtoConsumido = await prisma.produtosConsumidos.create({
      data: {
        clienteId: cliente.id,
        produtoId: Number(produtoId),
      },
    });

    return res.json(produtoConsumido);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Cadastrar a compra PRODUTO no cliente pelo id
router.post('/cliente/cpf/:cpf/produto', async (req: Request, res: Response) => {
  const { cpf } = req.params;
  const { produtoId } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { cpfValor: cpf },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const produto = await prisma.produto.findUnique({
      where: { id: Number(produtoId) },
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const produtoConsumido = await prisma.produtosConsumidos.create({
      data: {
        clienteId: cliente.id,
        produtoId: Number(produtoId),
      },
    });

    return res.json(produtoConsumido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado' });
  }
});

// Cadastrar a compra SERVIÇO no cliente pelo id
router.post('/cliente/id/:id/servico', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { servicoId } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const servico = await prisma.servico.findUnique({
      where: { id: Number(servicoId) },
    });

    if (!servico) {
      return res.status(404).json({ error: 'servico não encontrado' });
    }

    const servicoConsumido = await prisma.servicosConsumidos.create({
      data: {
        clienteId: Number(id),
        servicoId: Number(servicoId),
      },
    });

    return res.json(servicoConsumido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado' });
  }
});

// Cadastrar a compra servico no cliente pelo nome
router.post('/cliente/nome/:nome/servico', async (req: Request, res: Response) => {
  const { nome } = req.params;
  const { servicoId } = req.body;

  try {
    const cliente = await prisma.cliente.findFirst({
      where: { nome },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const servico = await prisma.servico.findUnique({
      where: { id: Number(servicoId) },
    });

    if (!servico) {
      return res.status(404).json({ error: 'servico não encontrado' });
    }

    const servicoConsumido = await prisma.servicosConsumidos.create({
      data: {
        clienteId: cliente.id,
        servicoId: Number(servicoId),
      },
    });

    return res.json(servicoConsumido);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// Cadastrar a compra PRODUTO no cliente pelo id
router.post('/cliente/cpf/:cpf/servico', async (req: Request, res: Response) => {
  const { cpf } = req.params;
  const { servicoId } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { cpfValor: cpf },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const servico = await prisma.servico.findUnique({
      where: { id: Number(servicoId) },
    });

    if (!servico) {
      return res.status(404).json({ error: 'servico não encontrado' });
    }

    const servicoConsumido = await prisma.servicosConsumidos.create({
      data: {
        clienteId: cliente.id,
        servicoId: Number(servicoId),
      },
    });

    return res.json(servicoConsumido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo deu errado' });
  }
});

// LISTAGENS //

// Rota para listar os produtos mais consumidos
router.get('/produtos/maisConsumidos', async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany();
    const produtosMaisConsumidos = await Promise.all(produtos.map(async (produto: { id: number, nome: string }) => {
      const count = await prisma.produtosConsumidos.count({
        where: {
          produtoId: produto.id
        }
      });
      return {
        nomeProduto: produto.nome,
        count
      };
    }));
    produtosMaisConsumidos.sort((a: { count: number }, b: { count: number }) => b.count - a.count);
    res.json(produtosMaisConsumidos);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Rota para listar os serviços mais consumidos
router.get('/servicos/maisConsumidos', async (req: Request, res: Response) => {
  try {
    const servicos = await prisma.servico.findMany();
    const servicosMaisConsumidos = await Promise.all(servicos.map(async (servico: { id: number, name: string }) => {
      const count = await prisma.servicosConsumidos.count({
        where: {
          servicoId: servico.id
        }
      });
      return {
        nomeServico: servico.name,
        count
      };
    }));
    servicosMaisConsumidos.sort((a: { count: number }, b: { count: number }) => b.count - a.count);
    res.json(servicosMaisConsumidos);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LISTAGENS POR GENERO //

// Rota para listar os produtos mais consumidos por um determinado gênero
router.get('/produtos/maisConsumidosPorGenero/:genero', async (req: Request, res: Response) => {
  try {
    const { genero } = req.params;
    const produtos = await prisma.produto.findMany();
    const produtosMaisConsumidosPorGenero = await Promise.all(produtos.map(async (produto: { id: number, nome: string }) => {
      const count = await prisma.produtosConsumidos.count({
        where: {
          produtoId: produto.id,
          cliente: {
            genero: genero
          }
        }
      });
      return {
        id: produto.id,
        produtoNome: produto.nome,
        count
      };
    }));
    produtosMaisConsumidosPorGenero.sort((a: { count: number }, b: { count: number }) => b.count - a.count);
    res.json(produtosMaisConsumidosPorGenero.slice(0, 10));
  } catch (error) {
    res.status(500).json(error);
  }
});

// Rota para listar os serviços mais consumidos por um determinado gênero
router.get('/servicos/maisConsumidosPorGenero/:genero', async (req: Request, res: Response) => {
  try {
    const { genero } = req.params;
    const servicos = await prisma.servico.findMany();
    const servicosMaisConsumidosPorGenero = await Promise.all(servicos.map(async (servico: { id: number, name: string }) => {
      const count = await prisma.servicosConsumidos.count({
        where: {
          servicoId: servico.id,
          cliente: {
            genero: genero
          }
        }
      });
      return {
        nomeServico: servico.name,
        count
      };
    }));
    servicosMaisConsumidosPorGenero.sort((a: { count: number }, b: { count: number }) => b.count - a.count);
    res.json(servicosMaisConsumidosPorGenero.slice(0, 10));
  } catch (error) {
    res.status(500).json(error);
  }
});



// LISTAGENS CLIENTE //
// listar TODOS os clientes
router.get('/clientes', async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
      select: {
        nome: true,
        genero: true,
        cpf: {
          select: {
            valor: true
          }
        },
        rgs: {
          select: {
            valor: true
          }
        },
        telefone: {
          select: {
            ddd: true,
            numero: true
          }
        }
      }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Buscar cliente pelo CPF
router.get('/cliente/cpf/:cpf', async (req: Request, res: Response) => {
  const { cpf } = req.params;
  console.log('CPF recebido:', cpf);
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        cpfValor: cpf
      },
      select: {
        id: true,
        nome: true,
        cpf: {
          select: {
            valor: true
          }
        }
      }
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Buscar cliente pelo ID
router.get('/cliente/id/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente pelo ID' });
  }
});

// Buscar cliente pelo nome
router.get('/cliente/nome/:nome', async (req: Request, res: Response) => {
  const { nome } = req.params;
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        nome: {
          contains: nome
        }
      }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente pelo nome' });
  }
});

router.get('/clientes/comprar', async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
      select: {
        id: true,
        nome: true,
        cpf: {
          select: {
            valor: true
          }
        }
      }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// listar os clientes por GÊNERO
router.get('/clientes/genero/:genero', async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        genero: req.params.genero
      },
      select: {
        nome: true,
        genero: true,
        cpf: {
          select: {
            valor: true
          }
        },
        rgs: {
          select: {
            valor: true
          }
        },
        telefone: {
          select: {
            ddd: true,
            numero: true
          }
        }
      }
    });
    console.log(clientes);
    res.json(clientes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Listagem dos 10 clientes que mais consumiram produtos ou serviços
router.get('/clientes/maisConsumidores', async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany();

    const totalConsumidoPorCliente = await Promise.all(clientes.map(async (cliente: { id: number, nome: string }) => {
      const produtosConsumidosCount = await prisma.produtosConsumidos.count({
        where: {
          clienteId: cliente.id
        }
      });

      const servicosConsumidosCount = await prisma.servicosConsumidos.count({
        where: {
          clienteId: cliente.id
        }
      });

      return {
        clienteId: cliente.id,
        nome: cliente.nome,
        totalConsumido: produtosConsumidosCount + servicosConsumidosCount
      };
    }));

    totalConsumidoPorCliente.sort((a, b) => b.totalConsumido - a.totalConsumido);

    const top10Clientes = totalConsumidoPorCliente.slice(0, 10);

    const detalhesClientes = await Promise.all(top10Clientes.map(async (cliente: { clienteId: number, nome: string }) => {
      const clienteDetalhes = await prisma.cliente.findUnique({
        where: {
          id: cliente.clienteId
        },
        select: {
          nome: true
        }
      });

      const produtosConsumidosCount = await prisma.produtosConsumidos.count({
        where: {
          clienteId: cliente.clienteId
        }
      });

      const servicosConsumidosCount = await prisma.servicosConsumidos.count({
        where: {
          clienteId: cliente.clienteId
        }
      });

      return {
        ...clienteDetalhes,
        produtosConsumidos: produtosConsumidosCount,
        servicosConsumidos: servicosConsumidosCount
      };
    }));

    res.json(detalhesClientes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Listagem dos 10 clientes que menos consumiram produtos ou serviços
router.get('/clientes/menosConsumidores', async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany();

    const totalConsumidoPorCliente = await Promise.all(clientes.map(async (cliente: { id: number, nome: string }) => {
      const produtosConsumidosCount = await prisma.produtosConsumidos.count({
        where: {
          clienteId: cliente.id
        }
      });

      const servicosConsumidosCount = await prisma.servicosConsumidos.count({
        where: {
          clienteId: cliente.id
        }
      });

      return {
        clienteId: cliente.id,
        nome: cliente.nome,
        totalConsumido: produtosConsumidosCount + servicosConsumidosCount
      };
    }));

    // Ordenar do menor para o maior total consumido
    totalConsumidoPorCliente.sort((a, b) => a.totalConsumido - b.totalConsumido);

    const bottom10Clientes = totalConsumidoPorCliente.slice(0, 10);

    const detalhesClientes = await Promise.all(bottom10Clientes.map(async (cliente: { clienteId: number, nome: string }) => {
      const clienteDetalhes = await prisma.cliente.findUnique({
        where: {
          id: cliente.clienteId
        },
        select: {
          nome: true
        }
      });

      const produtosConsumidosCount = await prisma.produtosConsumidos.count({
        where: {
          clienteId: cliente.clienteId
        }
      });

      const servicosConsumidosCount = await prisma.servicosConsumidos.count({
        where: {
          clienteId: cliente.clienteId
        }
      });

      return {
        ...clienteDetalhes,
        produtosConsumidos: produtosConsumidosCount,
        servicosConsumidos: servicosConsumidosCount
      };
    }));

    res.json(detalhesClientes);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Listagem dos 5 que mais consumiram em valor
router.get('/clientes/maisConsumidoresValor', async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany();

    const totalGastoPorCliente = await Promise.all(clientes.map(async (cliente: { id: number, nome: string }) => {
      const produtosConsumidos = await prisma.produtosConsumidos.findMany({
        where: {
          clienteId: cliente.id
        },
        select: {
          produto: {
            select: {
              preco: true
            }
          }
        }
      });

      const servicosConsumidos = await prisma.servicosConsumidos.findMany({
        where: {
          clienteId: cliente.id
        },
        select: {
          servico: {
            select: {
              price: true
            }
          }
        }
      });

      const totalGastoEmProdutos = produtosConsumidos.reduce((total: any, produto: any) => total + produto.produto.preco, 0);
      const totalGastoEmServicos = servicosConsumidos.reduce((total: any, servico: any) => total + servico.servico.price, 0);

      return {
        nome: cliente.nome,
        totalGasto: totalGastoEmProdutos + totalGastoEmServicos
      };
    }));

    // Ordenar do maior para o menor total gasto
    totalGastoPorCliente.sort((a, b) => b.totalGasto - a.totalGasto);

    const top5Clientes = totalGastoPorCliente.slice(0, 5);

    res.json(top5Clientes);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/produto/id/:id', async (req: Request, res: Response) => {
  try {
    const produto = await prisma.produto.findFirst({
      where: {
        id: Number(req.params.id)
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        quantidadeEstoque: true,
      }
    });

    if (!produto) {
      throw new Error(`Não foi possível encontrar o produto com o id ${req.params.id}`);
    }

    console.log(produto); // Log the data to check it
    res.json(produto);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/servicos/id/:id', async (req: Request, res: Response) => {
  try {
    const servico = await prisma.servico.findFirst({
      where: {
        id: Number(req.params.id)
      },
      select: {
        id: true,
        name: true,
        descricao: true,
        price: true
      }
    });

    if (!servico) {
      throw new Error(`Não foi possível encontrar o serviço com o id ${req.params.id}`);
    }

    res.json(servico);
  } catch (err) {
    res.status(400).json(err);
  }
});


// listar todos os PRODUTOS
router.get('/produto', async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany({
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        quantidadeEstoque: true,
      }
    });

    if (!produtos || produtos.length === 0) {
      throw new Error('Não foi possível encontrar nenhum produto');
    }

    res.json(produtos);
  } catch (err) {
    res.status(400).json(err);
  }
});

// listar todos os SERVIÇOS
router.get('/servicos', async (req: Request, res: Response) => {
  try {
    const servicos = await prisma.servico.findMany({
      select: {
        id: true,
        name: true,
        price: true,
      }
    });
    if (!servicos) {
      throw new Error('Não foi possível encontrar nenhum produto');
    }
    res.json(servicos);
  } catch (err) {
    res.status(400).json(err);
  }
})

// Rotas para Empresa
/*router.get('/empresa', async (req, res) => {
  const empresas = await prisma.empresa.findMany()
  res.json(empresas)
})

router.get('/empresa/:id', async (req, res) => {
  const empresa = await prisma.empresa.findUnique({
    where: {
      id: Number(req.params.id),
    },
  })
  res.json(empresa)
})

router.post('/empresa', async (req, res) => {
  const novaEmpresa = await prisma.empresa.create({
    data: req.body,
  })
  res.json(novaEmpresa)
})

router.put('/empresa/:id', async (req, res) => {
  const empresaAtualizada = await prisma.empresa.update({
    where: {
      id: Number(req.params.id),
    },
    data: req.body,
  })
  res.json(empresaAtualizada)
})

router.delete('/empresa/:id', async (req, res) => {
  const empresaDeletada = await prisma.empresa.delete({
    where: {
      id: Number(req.params.id),
    },
  })
  res.json(empresaDeletada)
})

router.delete('/products/:id', async (req, res) => {
  res.send({ message: 'Uhul funcionou!' })
})

// Rotas para RG
router.get('/rg', async (req, res) => {
  const rgs = await prisma.rg.findMany()
  res.json(rgs)
})

// Rotas para CPF
router.get('/cpf', async (req, res) => {
  const cpfs = await prisma.cpf.findMany()
  res.json(cpfs)
})

// Rotas para Produto
router.get('/produto', async (req, res) => {
  const produtos = await prisma.produto.findMany()
  res.json(produtos)
})

// Rotas para ProdutosConsumidos
router.get('/produtosconsumidos', async (req, res) => {
  const produtosConsumidos = await prisma.produtosConsumidos.findMany()
  res.json(produtosConsumidos)
})

// Rotas para Servico
router.get('/servico', async (req, res) => {
  const servicos = await prisma.servico.findMany()
  res.json(servicos)
})

// Rotas para ServicosConsumidos
router.get('/servicosconsumidos', async (req, res) => {
  const servicosConsumidos = await prisma.servicosConsumidos.findMany()
  res.json(servicosConsumidos)
})*/

module.exports = router