import Cliente from "../../modelo/clientes/cliente";
import Listagem from "./listagem";
import Produto from "../../modelo/produto-servico/produto";

export default class ListagemMaisConsumidosGenero extends Listagem{
    private clientes: Array<Cliente>;
    private genero: string;

    constructor(clientes: Array<Cliente>, genero: string) {
        super()
        this.clientes = clientes;
        this.genero = genero;
    }

    public listar(): void {
        const clientesFiltrados = this.clientes.filter(cliente => cliente.getGenero === this.genero);
        let contadorProdutos: {[key: string]: number} = {};

        clientesFiltrados.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach((produto: Produto) => {
                if (produto && produto.getNomeProduto) {
                    if (contadorProdutos[produto.getNomeProduto]) {
                        contadorProdutos[produto.getNomeProduto]++;
                    } else {
                        contadorProdutos[produto.getNomeProduto] = 1;
                    }
                }
            });
        });        

        for (let produto in contadorProdutos) {
            console.log(`${produto}: ${contadorProdutos[produto]} unidades`);
        }
    }
}