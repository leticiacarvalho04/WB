const router = require('express').Router();
const{ PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient;

// Rotas para Empresa
router.get('/empresa', async (req, res) => {
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

router.delete('/products/:id', async(req,res)=>{
    res.send({message:'Uhul funcionou!'})
})

module.exports = router