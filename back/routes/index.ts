import { Request, Response } from 'express';
import { connect } from 'http2';
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();

const prisma = new PrismaClient();
router.use(express.json());

// Cadastrar cliente
router.post('/cadastro', async (req: Request, res: Response) => {
  const { nome, nomeSocial, genero, numeroTelefone, dataEmissao, cpfValor, rgValor, empresaId } = req.body;
  try {
    // Buscar o telefone pelo número
    const telefone = await prisma.telefone.findFirst({
      where: {
        numero: numeroTelefone,
      },
    });    

    if (!telefone) {
      return res.status(400).json({ error: 'Telefone não encontrado' });
    }

    const novoCliente = await prisma.cliente.create({
      data: {
        nome: nome,
        nomeSocial: nomeSocial,
        genero: genero,
        telefone:{
          connect:{
            id: telefone.id
          }
        },
        cpf: {
          connect: {
            valor: cpfValor
          }
        },
        rgs: {
          connect: {
            valor: rgValor,
          }
        },
        empresa: {
          connect: {
            id: empresaId
          }
        }
      },
    });
    console.log(novoCliente);
    res.json(novoCliente);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/clientes', async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post('/telefones', async (req: Request, res: Response) => {
    const { ddd, numero } = req.body;
    try {
      const novoTelefone = await prisma.telefone.create({
        data: {
          ddd: ddd,
          numero: numero,
        },
      });
      res.json(novoTelefone);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.post('/rgs', async (req: Request, res: Response) => {
    const { valor } = req.body;
    try {
      const novoRG = await prisma.rG.create({
        data: {
          valor: valor,
          dataEmissao: new Date(),
        },
      });
      res.json(novoRG);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.post('/cpfs', async (req: Request, res: Response) => {
  const { valor } = req.body;
  try {
    const novoCPF = await prisma.cPF.create({
      data: {
        valor: valor,
        dataEmissao: new Date(),
      },
    });
    res.json(novoCPF);
  } catch (error) {
    res.status(500).json(error);
  }
});

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