import Cliente from "../../modelo/clientes/cliente";
import Produto from "../../modelo/produto-servico/produto";
import Servico from "../../modelo/produto-servico/servico";
import Listagem from "./listagem";

export default class ListarMaisConsumidos extends Listagem {
    private clientes: Array<Cliente> 
    private produtos: Array<Produto>
    private servicos: Array<Servico>

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        super()
        this.clientes = clientes
        this.produtos = produtos
        this.servicos = servicos
    }
    
    public listar(): void {
        let contadorProdutos: {[key: string]: number} = {};
        let contadorServicos: {[key: string]: number} = {};

        // Conta a quantidade de cada produto consumido
        this.clientes.forEach(cliente => {
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

        // Conta a quantidade de cada serviço consumido
        this.clientes.forEach(cliente => {
            cliente.getServicosConsumidos.forEach((servico: Servico) => {
                if (servico && servico.getNome) {
                    if (contadorServicos[servico.getNome]) {
                        contadorServicos[servico.getNome]++;
                    } else {
                        contadorServicos[servico.getNome] = 1;
                    }
                }
            });
        });        

        console.log(`Produtos mais consumidos:`);
        for (let produto in contadorProdutos) {
            console.log(`${produto}: ${contadorProdutos[produto]} unidades`);
        }

        console.log(`\nServiços mais consumidos:`);
        for (let servico in contadorServicos) {
            console.log(`${servico}: ${contadorServicos[servico]} serviços`);
        }
    }
}
