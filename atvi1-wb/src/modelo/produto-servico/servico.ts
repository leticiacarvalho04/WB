export default class Servico {
    private static idCounter: number = 1;
    private id: number;
    public nome: string;
    public descricao: string;
    public preco: number;
    public estoqueAtual: number;

    constructor(nome: string, descricao: string, preco: number){
        this.id = Servico.idCounter++;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public get getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public getPreco(): number {
        return this.preco;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }
}
