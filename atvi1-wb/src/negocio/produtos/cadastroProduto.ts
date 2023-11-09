import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto-servico/produto";
import { CadastroPro } from "../cadastro";

export default class CadastroProduto extends CadastroPro {
    private produtos: Array<Produto>;
    private entrada: Entrada;
    constructor(produtos: Array<Produto>) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrarProduto(): void {
        console.log(`\nInício do cadastro de produto`);
        let nome = this.entrada.receberTexto(`Por favor, informe o nome do produto: `)
        let descricao = this.entrada.receberTexto(`Por favor, informe a descrição do produto: `)
        let precoVenda = this.entrada.receberNumero(`Por favor, informe o preço do produto? $`);
        let estoqueAtual = this.entrada.receberNumero(`Quantidade em estoque atualmente? `)

        let produto = new Produto(nome, descricao, precoVenda, estoqueAtual);
        this.produtos.push(produto);
        console.log(`\nCadastro de produto concluído :)\n`);
    }
}