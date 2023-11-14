import Cliente from "../../modelo/clientes/cliente";
import Listagem from "../listagens/listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`Gênero: `+cliente.genero);
            
            if (cliente.getRgs.length === 1) {
                console.log(`RG: ` + cliente.getRgs[0].getValor);
            } else {
                cliente.getRgs.forEach((rg, index) => {
                    console.log(`RG ${index + 1}: ` + rg.getValor);
                });
            }

            if (cliente.getTelefones.length === 1) {
                console.log(`Telefone: ` + cliente.getTelefones[0].getNumero);
            } else {
                cliente.getTelefones.forEach((telefone, index) => {
                    console.log(`Telefone ${index + 1}: ` + telefone.getNumero);
                });
            }

            console.log(`--------------------------------------`);
        });
    }
}
