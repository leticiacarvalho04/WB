import Cliente from "../../modelo/clientes/cliente";
import Listagem from "./listagem";

export default class ListagemClientesConsumiram extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        // Cria um array de objetos com a quantidade total de consumo para cada cliente
        let consumoClientes = this.clientes.map(cliente => ({
            nome: cliente.getNome,
            totalConsumo: cliente.getProdutosConsumidos.length + cliente.getServicosConsumidos.length
        }));

        // Ordena os clientes com base na quantidade total de consumo
        consumoClientes.sort((a, b) => b.totalConsumo - a.totalConsumo);

        // Lista os 10 primeiros clientes (ou todos se houver menos de 10)
        const quantidadeClientes = Math.min(consumoClientes.length, 10);
        for (let i = 0; i < quantidadeClientes; i++) {
            console.log(`${i + 1} - ${consumoClientes[i].nome}, Consumo total: ${consumoClientes[i].totalConsumo}`);
        }
        return;
    }
}