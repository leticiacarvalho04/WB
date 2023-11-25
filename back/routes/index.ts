import { Request, Response } from 'express';
import { connect } from 'http2';
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();

const prisma = new PrismaClient();
router.use(express.json());

                                              // CADASTROS //

// Cadastrar cliente
router.post('/cadastroCli', async (req: Request, res: Response) => {
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

router.post('/cadastroPro',async(req:Request,res:Response)=>{
  const {nome, descricao, preco, quantidadeEstoque, empresaId} = req.body
  try{
    const novoProduto = await prisma.produto.create({
      data: {
        nome: nome,
        descricao: descricao,
        preco: preco,
        quantidadeEstoque: quantidadeEstoque,
        empresa: {
          connect: {
            id: empresaId
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

  router.post('/cadastroServ',async(req:Request,res:Response)=>{
    const {name, price, descricao, empresaId} = req.body
    try{
      const novoProduto = await prisma.produto.create({
        data: {
          nome: name,
          descricao: descricao,
          preco: price,
          empresa: {
            connect: {
              id: empresaId
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
          await prisma.telefone.create({ data: {telefoneObjects} });
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
      const { novoNome, nomeSocial, genero, telefone, ddd, numeroTelefone, rgValor, empresaId } = req.body;
    
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
            empresaId: empresaId
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
      const { name, descricao, preco, empresaId } = req.body;
    
      try {
        const servico = await prisma.Servico.upsert({
          where: { id: Number(id) },
          update: { name: name, descricao: descricao, price: preco, empresaId: empresaId },
          create: { name: name, descricao: descricao, price: preco, empresaId: empresaId },
        });
    
        console.log(servico)
        res.json(servico);
      } catch (error) {
        console.log(error)
        res.status(500).json(error);
      }
    });    

    // Atualiza um serviço pelo nome
    router.put('/servico/nome/:nome', async (req: Request, res: Response) => {
      const { nome } = req.params;
      const { novoNome, descricao, preco, empresaId } = req.body;

      try {
        const servico = await prisma.Servico.upsert({
          where: { name: nome },
          update: { name: novoNome, descricao: descricao, price: preco, empresaId: empresaId },
          create: { name: novoNome, descricao: descricao, price: preco, empresaId: empresaId }
        });

        res.json(servico);
      } catch (error) {
        console.log(error)
        res.status(500).json(error);
      }
    });

    // Atualiza um produto pelo ID
    router.put('/produto/id/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const { nome, descricao, preco, quantidadeEstoque, empresaId } = req.body;
    
      try {
        const produto = await prisma.Produto.upsert({
          where: { id: Number(id) },
          update: { nome: nome, descricao: descricao, preco: preco, quantidadeEstoque: quantidadeEstoque, empresaId: empresaId },
          create: { nome: nome, descricao: descricao, preco: preco, quantidadeEstoque: quantidadeEstoque, empresaId: empresaId },
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
        const clientes = await prisma.cliente.findMany();
        res.json(clientes);
      } catch (error) {
        res.status(500).json(error);
      }
    });

    // listar os clientes por GÊNERO
    router.get('/clientes/genero/:genero', async (req: Request,res: Response) => {
        try {
          const clientes = await prisma.cliente.findMany({
            where: {
              genero: req.params.genero
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
          // Primeiro, obtenha a contagem de produtos consumidos por cada cliente
          const produtosConsumidosPorCliente = await prisma.produtosConsumidos.groupBy({
            by: ['clienteId'],
            _count: true
          });

          // Em seguida, obtenha a contagem de serviços consumidos por cada cliente
          const servicosConsumidosPorCliente = await prisma.servicosConsumidos.groupBy({
            by: ['clienteId'],
            _count: true
          });

          // Agora, combine os resultados
          const totalConsumidoPorCliente = produtosConsumidosPorCliente.map((cliente: { clienteId: number, _count: number }) => {
            const servicosConsumidos = servicosConsumidosPorCliente.find((c: { clienteId: number, _count: number }) => c.clienteId === cliente.clienteId);
            return {
              clienteId: cliente.clienteId,
              totalConsumido: cliente._count + (servicosConsumidos ? servicosConsumidos._count : 0)
            };
          });

          // Ordene os resultados pelo total consumido
          totalConsumidoPorCliente.sort((a: { totalConsumido: number }, b: { totalConsumido: number }) => b.totalConsumido - a.totalConsumido);

          // Pegue os 10 primeiros resultados
          const top10Clientes = totalConsumidoPorCliente.slice(0, 10);

          // Finalmente, obtenha os detalhes completos dos clientes
          const detalhesClientes = await Promise.all(top10Clientes.map(async (cliente: { clienteId: number }) => {
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

          console.log(detalhesClientes);
          res.json(detalhesClientes);
        } catch (error) {
          res.status(500).json(error);
        }
      });

    // Listar os 10 clientes que menos consumiram
    router.get('/clientes/menosConsumidores', async (req: Request, res: Response) => {
      try {
        // Primeiro, obtenha a lista de todos os clientes
        const clientes = await prisma.cliente.findMany();
  
        // Em seguida, para cada cliente, obtenha a contagem de produtos e serviços consumidos
        const totalConsumidoPorCliente = await Promise.all(clientes.map(async (cliente:{id: number, nome: string}) => {
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
  
        // Ordene os resultados pelo total consumido em ordem ascendente
        totalConsumidoPorCliente.sort((a, b) => a.totalConsumido - b.totalConsumido);
  
        // Pegue os 10 primeiros resultados
        const top10Clientes = totalConsumidoPorCliente.slice(0, 10);
  
        // Finalmente, obtenha os detalhes completos dos clientes
        const detalhesClientes = await Promise.all(top10Clientes.map(async (cliente:{clienteId:number, nome:string}) => {
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
  
        console.log(detalhesClientes);
        res.json(detalhesClientes);
      } catch (error) {
        res.status(500).json(error);
      }
    });  

    //Listagem dos 5 que mais consumiram em valor
    router.get('/clientes/maioresConsumidoresValor', async (req: Request, res: Response) => {
      try {
        // Obtaining the list of all clients
        const clientes = await prisma.cliente.findMany();
    
        // Calculating the total value consumed by each client
        const totalValorConsumidoPorCliente = await Promise.all(clientes.map(async (cliente:{id:number, valor:any}) => {
          const produtosConsumidos = await prisma.produtosConsumidos.findMany({
            where: {
              clienteId: cliente.id
            },
            select: {
              valor: true
            }
          });
    
          const servicosConsumidos = await prisma.servicosConsumidos.findMany({
            where: {
              clienteId: cliente.id
            },
            select: {
              valor: true
            }
          });
    
          const valorTotalProdutos = produtosConsumidos.reduce((total: any, produto: any) => total + produto.valor, 0);
          const valorTotalServicos = servicosConsumidos.reduce((total: any, servico: any) => total + servico.valor, 0);
    
          return {
            clienteId: cliente.id,
            totalValorConsumido: valorTotalProdutos + valorTotalServicos
          };
        }));
    
        // Sorting the results by total value consumed in descending order
        totalValorConsumidoPorCliente.sort((a, b) => b.totalValorConsumido - a.totalValorConsumido);
    
        // Taking the top 5 results
        const top5Clientes = totalValorConsumidoPorCliente.slice(0, 5);
    
        // Getting the complete details of the clients
        const detalhesClientes = await Promise.all(top5Clientes.map(async (cliente:{clienteId: number, nome: string, totalValorConsumido:any}) => {
          const clienteDetalhes = await prisma.cliente.findUnique({
            where: {
              id: cliente.clienteId
            },
            select: {
              nome: true
            }
          });
    
          return {
            ...clienteDetalhes,
            totalValorConsumido: cliente.totalValorConsumido
          };
        }));
    
        console.log(detalhesClientes);
        res.json(detalhesClientes);
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