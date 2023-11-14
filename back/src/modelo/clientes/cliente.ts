import CPF from "./cpf"
import Produto from "../produto-servico/produto"
import RG from "./rg"
import Servico from "../produto-servico/servico"
import Telefone from "./telefone"

export default class Cliente {
    private static idCounter: number = 1;
    private id: number;
    public nome: string
    public nomeSocial: string
    public genero: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    private totalConsumido: number = 0;
    constructor(nome: string, nomeSocial: string, cpf: CPF, genero:string, rg: RG) {
        this.id = Cliente.idCounter++;
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.genero = genero
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    
    // Adicionando o método setCpf
    public setCpf(cpf: CPF): void {
        this.cpf = cpf;
    }

    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }

    public adicionarProdutoConsumido(produto: Produto): void {
        this.produtosConsumidos.push(produto);
    }

    public adicionarServicosConsumidos(servicos: Servico): void {
        this.servicosConsumidos.push(servicos);
    }    

    public adicionarTelefone(telefone: Telefone) {
        this.telefones.push(telefone);
    }

    public get getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public get getNome(): string {
        return this.nome
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public get getNomeSocial(): string {
        return this.nomeSocial;
    }

    public setNomeSocial(nomeSocial: string): void {
        this.nomeSocial = nomeSocial;
    }
    
     public get getGenero(): string {
         return this.genero;
     }

     public setGenero(genero: string): void {
         this.genero = genero;
     }
     
     public setDataCadastro(dataCadastro: Date): void {
         this.dataCadastro = dataCadastro;
     }
     
     public setRGs(rgs: Array<RG>): void {
         this.rgs = rgs;
     }
     
     public setTelefones(telefones: Array<Telefone>): void {
         this.telefones = telefones;
     }  
     
     public get getTotalConsumido(): number {
         return this.totalConsumido;
     }

     public adicionarTotalConsumido(valor: number): void {
         this.totalConsumido += valor;
     }
}
