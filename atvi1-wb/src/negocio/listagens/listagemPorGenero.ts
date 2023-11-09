import Cliente from "../../modelo/clientes/cliente";
import Listagem from "./listagem";

export class ListagemClientesPorGenero extends Listagem {
    private clientes: Array<Cliente>
    private genero: string;

    constructor(clientes: Array<Cliente>, genero: string) {
        super();
        this.clientes = clientes;
        this.genero = genero;
    }
    public listar(): void {
        const clientesFiltrados = this.clientes.filter(cliente => cliente.genero === this.genero);
        clientesFiltrados.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`Gênero: `+cliente.genero);
            console.log(`--------------------------------------`);
        });
    }
}