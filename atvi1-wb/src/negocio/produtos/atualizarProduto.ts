import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto-servico/produto";
import Atualizar from "../atualizar";

export default class AtualizarProduto extends Atualizar {
    public atualizar(): void {
        throw new Error("Method not implemented.");
    }
    private produtos: Array<Produto>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public atualizarPro(): void {
        console.log(`Escolha como deseja procurar o produto:`);
        console.log(`1 - Procurar por Nome`);
        console.log(`2 - Procurar por ID`);
        console.log(`0 - Voltar`);

        let opcaoBusca = this.entrada.receberNumero('Insira a opção desejada: ');

        if (opcaoBusca === 1) {
            let nome = this.entrada.receberTexto('Insira o nome do produto que deseja atualizar: ');

            const index = this.produtos.findIndex(p => p.getNomeProduto === nome);

            this.atualizarProduto(index);
        } else if (opcaoBusca === 2) {
            for (let indexProduto = 0; indexProduto < this.produtos.length; indexProduto++) {
                console.log(indexProduto +" - " + this.produtos[indexProduto].getNomeProduto);
            }
            let id = this.entrada.receberNumero('Insira o ID do produto que deseja atualizar: ');

            if (id >= 0 && id < this.produtos.length) {
                this.atualizarProduto(id);
            } else {
                console.log(`ID inválido.`);
            }
        } else if (opcaoBusca === 0) {
            console.log('Operação cancelada pelo usuário.');
            return;
        } else {
            console.log('Opção inválida.');
            return;
        }
    }

    private atualizarProduto(index: number): void {
        if (index !== -1) {
            const produto = this.produtos[index];

            let operacao = true;

            while (operacao) {
                console.log(`--------------------------------------`);
                console.log(`Escolha a opção que quer atualizar:`);
                console.log(`1 - Nome`);
                console.log(`2 - Descrição`);
                console.log(`3 - Preço`);
                console.log(`4 - Estoque`);
                console.log(`0 - Voltar`);

                let opcao = this.entrada.receberNumero('Insira qual informação será alterada: ');

                switch (opcao) {
                    case 1:
                        let novoNome = this.entrada.receberTexto('Insira o novo nome do produto: ');
                        produto.setNome(novoNome);
                        break;
                    case 2:
                        let novaDescricao = this.entrada.receberTexto('Insira a nova descrição do produto: ');
                        produto.setDescricao(novaDescricao);
                        break;
                    case 3:
                        let novoPreco = this.entrada.receberNumero('Insira o novo preço do produto: ');
                        produto.setPrecoProduto(novoPreco);
                        break;
                    case 4:
                        let novoEstoque = this.entrada.receberNumero('Insira o novo estoque do produto: ');
                        produto.setEstoqueAtual(novoEstoque);
                        break;
                    case 0:
                        operacao = false;
                        break;
                    default:
                        console.log('Opção não entendida :(')
                }
            }
            
            console.log(`Produto atualizado!`);
        } else {
            console.log(`Índice inválido.`);
        }
    }
}
