import Cliente from "./clientes/cliente";
import Produto from "./produto-servico/produto";
import Servico from "./produto-servico/servico";

export default class Empresa {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    constructor() {
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
    }
    public get getClientes() {
        return this.clientes;
    }
    public get getProdutos() {
        return this.produtos;
    }
    public get getServicos() {
        return this.servicos;
    }
}
