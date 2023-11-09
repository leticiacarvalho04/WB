import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto-servico/produto";
import Listagem from "../listagens/listagem";

export default class ListagemProduto extends Listagem{
    private produtos: Array<Produto>;
    private entrada: Entrada;
    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada;
    }

    public listar(): void{
        console.log(`\nLista de todos os produtos: `);
        console.log(`--------------------------------------`);
        this.produtos.forEach(produto => {
            console.log(`Nome: ` + produto.nome);
            console.log(`Descrição: ` + produto.descricao);
            console.log(`Preço da Venda: ` + produto.precoProduto);
            console.log(`Estoque atual: ` + produto.estoqueAtual);
            console.log(`--------------------------------------`);
        });
    }
}