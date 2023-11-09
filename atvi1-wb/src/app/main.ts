import listaDeClientes from "../inserts/insertCliente";
import listaDeProdutos from "../inserts/insertProduto";
import Entrada from "../io/entrada";
import { Genero } from "../modelo/clientes/genero";
import Empresa from "../modelo/empresa"
import CadastroCliente from "../negocio/clientes/cadastroCliente";
import CadastroProduto from "../negocio/produtos/cadastroProduto";
import CadastroServico from "../negocio/servicos/cadastroServico";
import ListagemClientes from "../negocio/clientes/listagemCliente";
import ListagemProduto from "../negocio/produtos/listagemProdutos";
import ListagemServico from "../negocio/servicos/listagemServicos";
import { ListagemClientesPorGenero } from "../negocio/listagens/listagemPorGenero";
import AtualizarCliente from "../negocio/clientes/atualizarCliente";
import DeletarCliente from "../negocio/clientes/deletarCliente";
import AtualizarPro from "../negocio/produtos/atualizarProduto";
import DeletarProduto from "../negocio/produtos/deletarProduto";
import AtualizarServico from "../negocio/servicos/atualizarServicos";
import DeletarServico from "../negocio/servicos/deletarServicos";
import AtualizarProduto from "../negocio/produtos/atualizarProduto";
import ListagemClientesConsumiram from "../negocio/listagens/listagemMaisConsumiram";
import ListarProdutosMaisConsumidos from "../negocio/listagens/listagemMaisConsumidos";
import ListarMaisConsumidos from "../negocio/listagens/listagemMaisConsumidos";
import listagemDeServicos from "../inserts/insertServicos";
import ListagemMaisConsumidosGenero from "../negocio/listagens/listagemMaisConsumidosGenero";
import ListagemMenosClientesConsumiram from "../negocio/listagens/listagemMenosConsumiram";
import ListagemMaioresConsumidoresPorValor from "../negocio/listagens/listagemMaisConsumiramValor";
import CadastrarProdutoCli from "../negocio/produtos/cadastroprodCli";

console.log(`\nBem-vindo ao cadastro de clientes do Grupo World Beauty`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`\n-----------------`);
    console.log(`Opções:`);
    console.log(`-----------------`);

    console.log(`\nCLIENTE`);
    console.log(`-----------------`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Atualizar um cliente`);
    console.log(`4 - Deletar o cadastro de um cliente`);

    console.log(`\nSERVIÇOS`);
    console.log(`-----------------`);
    console.log(`5 - Cadastrar serviços`);
    console.log(`6 - Listar serviços`);
    console.log(`7 - Atualizar um serviço`);
    console.log(`8 - Deletar um serviço`);

    console.log(`\nPRODUTOS`);
    console.log(`-----------------`);
    console.log(`9 - Cadastrar produtos`);
    console.log(`10 - Cadastrar um produto consumido pelo cliente: `);
    console.log(`11 - Listar produtos`);
    console.log(`12 - Atualizar um produto`);
    console.log(`13 - Deletar um produto`);

    console.log(`\nLISTAGENS`);
    console.log(`-----------------`);
    console.log(`14 - Listar clientes por gênero`);
    console.log(`15 - Listar os 10 clientes que mais consumiram produtos ou serviços`);
    console.log(`16 - Listar os produtos ou serviços mais consumidos`);
    console.log(`17 - Listar os produtos ou serviços mais consumidos por gênero`);
    console.log(`18 - Listar os 10 clientes que menos consumiram produtos ou serviços`);
    console.log(`19 - Listar os 5 clientes que mais consumiram em valor`);
    console.log(`\n0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`\nPor favor, escolha uma opção: `)

    switch (opcao) {
        // CLIENTE //
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrarCliente()
            break;
        case 2:
            let listagemp = new ListagemClientes(listaDeClientes)
            listagemp.listar()
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
        case 3:
            let atualizarL = new AtualizarCliente(listaDeClientes)
            atualizarL.atualizarCliente()
            let atualizar = new AtualizarCliente(empresa.getClientes)
            atualizar.atualizarCliente()
            break;
        case 4:
            let deletarL = new DeletarCliente(listaDeClientes)
            deletarL.deletarCliente()
            let deletar = new DeletarCliente(empresa.getClientes)
            deletar.deletarCliente()
            break;

        // SERVIÇOS //    
        case 5:
            let cadastroSer = new CadastroServico(empresa.getServicos)
            cadastroSer.cadastrarServico()
            break;
        case 6:
            let listagemS = new ListagemServico(empresa.getServicos)
            listagemS.listar()
            break;
        case 7:
            let atualizarSer = new AtualizarServico(empresa.getServicos)
            atualizarSer.atualizarServico()
            break;
        case 8:
            let deletarSer = new DeletarServico(empresa.getServicos)
            deletarSer.deletarServico()
            break;

        // PRODUTOS //
        case 9:
            let cadastroProd = new CadastroProduto(empresa.getProdutos);
            cadastroProd.cadastrarProduto();
            break;
        case 10:
            let cadastroProSerCli = new CadastrarProdutoCli(empresa.getClientes,empresa.getProdutos,empresa.getServicos)
            let cadastroProCli = new CadastrarProdutoCli(listaDeClientes,listaDeProdutos,listagemDeServicos)
            cadastroProCli.cadastrarProdutoServicoCli()
            cadastroProSerCli.cadastrarProdutoServicoCli()
            break;
        case 11:
            let produtosDaEmpresa = empresa.getProdutos;
            console.log(produtosDaEmpresa);
            let listagempp = new ListagemProduto(listaDeProdutos)
            listagempp.listar()
            let listagemP = new ListagemProduto(empresa.getProdutos)
            listagemP.listar()
            break;
        case 12:
            let listaProdutos = listaDeProdutos;
            let produtosEmpresa = empresa.getProdutos; 
            let todosOsProdutos = listaProdutos.concat(produtosEmpresa);
            let atualizarProdutos = new AtualizarProduto(todosOsProdutos);
            atualizarProdutos.atualizarPro();
            break;
        case 13:
            let deletarP = new DeletarProduto(listaDeProdutos)
            deletarP.deletarProduto()
            let deletarPro = new DeletarProduto(empresa.getProdutos)
            deletarPro.deletarProduto()
            break;

        // LISTAGENS //
        case 14:
            console.log(`\nGÊNERO FEMININO:`);
            let listagemfem = new ListagemClientesPorGenero(listaDeClientes,Genero.Feminino)
            listagemfem.listar()

            let listagemFem = new ListagemClientesPorGenero(empresa.getClientes,Genero.Feminino)
            listagemFem.listar()
            // -----------------------------//
            console.log(`\nGÊNERO MASCULINO:`);
            let listagemmasc = new ListagemClientesPorGenero(listaDeClientes,Genero.Masculino)
            listagemmasc.listar()

            let listagemMasc = new ListagemClientesPorGenero(empresa.getClientes,Genero.Masculino)
            listagemMasc.listar()
            break;
        case 15:
            console.log(`--------------------------------------------------------------`);
            console.log(`\nTop 10 clientes que mais consumiram (Quantidade)`);
            console.log(`--------------------------------------------------------------`);
            let cliMaisConsumidores = new ListagemClientesConsumiram(listaDeClientes)
            cliMaisConsumidores.listar()
            let cliMaisconsumidores = new ListagemClientesConsumiram(empresa.getClientes) //aplicando a listagem aos novos clientes cadastrados
            cliMaisconsumidores.listar()
            break;
        case 16:
            console.log(`--------------------------------------------------------------`);
            console.log(`\nListagem dos produtos e serviços mais consumidos`)
            console.log(`--------------------------------------------------------------`);
            const listaMaisConsumidos = new ListarMaisConsumidos(listaDeClientes,listaDeProdutos,listagemDeServicos);
            listaMaisConsumidos.listar();
            break;
        case 17:
            console.log(`--------------------------------------------------------------`);
            console.log(`\nListagem dos produtos e serviços mais consumidos por gênero`)
            console.log(`--------------------------------------------------------------`);

            console.log(`\nFEMININO:`);
            let listaMaisConsumidosfeminino = new ListagemMaisConsumidosGenero(listaDeClientes,Genero.Feminino) 
            console.log(`Listagem dos clientes já cadastrados anteriormente no sistema:`);
            listaMaisConsumidosfeminino.listar()

            let listaMaisConsumidosFeminino = new ListagemMaisConsumidosGenero(empresa.getClientes,Genero.Feminino) 
            console.log(`\nListagem dos novos clientes cadastrados no sistema:`);
            listaMaisConsumidosFeminino.listar()

            console.log(`\nMASCULINO:`);
            let listaMaisConsumidosmasculino = new ListagemMaisConsumidosGenero(listaDeClientes,Genero.Masculino)
            console.log(`Listagem dos clientes já cadastrados anteriormente no sistema:`);
            listaMaisConsumidosmasculino.listar()

            let listaMaisConsumidosMasculino = new ListagemMaisConsumidosGenero(empresa.getClientes,Genero.Masculino)
            console.log(`\nListagem dos novos clientes cadastrados no sistema:`);
            listaMaisConsumidosMasculino.listar()
            break;
        case 18:
            console.log(`--------------------------------------------------------------`);
            console.log(`\nTop 10 clientes que menos consumiram (Quantidade)`);
            console.log(`--------------------------------------------------------------`);
            let cliMenosConsumiram = new ListagemMenosClientesConsumiram(listaDeClientes)
            cliMenosConsumiram.listar()
            let MenosConsumiram = new ListagemMenosClientesConsumiram(empresa.getClientes) 
            MenosConsumiram.listar()
            break;
        case 19:
            console.log(`--------------------------------------------------------------`);
            console.log(`\nTop 5 clientes que mais consumiram em VALOR não em quantidade`);
            console.log(`--------------------------------------------------------------`);
            let cliMaiorValorConsumido = new ListagemMaioresConsumidoresPorValor(listaDeClientes)
            let MaiorValorConsumido= new ListagemMaioresConsumidoresPorValor(empresa.getClientes)
            MaiorValorConsumido.listar()
            cliMaiorValorConsumido.listar()
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}