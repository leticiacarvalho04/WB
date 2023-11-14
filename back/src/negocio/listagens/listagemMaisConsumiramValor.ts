import Cliente from "../../modelo/clientes/cliente";
import Listagem from "./listagem";

export default class ListagemClientesMenosConsumiram extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super ()
        this.clientes = clientes
    }
    public listar(): void {
        console.log(`\nTop 5 clientes que mais consumiram (Valor)`);

        // Cria um array de objetos com o valor total de consumo para cada cliente
        let consumoClientes = this.clientes.map(cliente => {
            let valorProdutos = cliente.getProdutosConsumidos.reduce((total, produto) => {
                if (produto) {
                    return total + produto.getPrecoProduto();
                } else {
                    return total;
                }
            }, 0);
            
            let valorServicos = cliente.getServicosConsumidos.reduce((total, servico) => {
                if (servico) {
                    return total + servico.getPreco();
                } else {
                    return total;
                }
            }, 0);
            
            return {
                nome: cliente.getNome,
                totalConsumo: valorProdutos + valorServicos
            };
        });

        // Ordena os clientes com base no valor total de consumo
        consumoClientes.sort((a, b) => b.totalConsumo - a.totalConsumo);

        // Lista os 5 primeiros clientes (ou todos se houver menos de 5)
        const quantidadeClientes = Math.min(consumoClientes.length, 5);
        for (let i = 0; i < quantidadeClientes; i++) {
            console.log(`${i + 1} - ${consumoClientes[i].nome}, Consumo total: ${consumoClientes[i].totalConsumo}`);
        }
    }
}
