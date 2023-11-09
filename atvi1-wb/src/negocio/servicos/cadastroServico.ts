import Entrada from "../../io/entrada";
import Servico from "../../modelo/produto-servico/servico";
import { CadastroServ } from "../cadastro";

export default class CadastroServico extends CadastroServ {
    private servicos: Array<Servico>;
    private entrada: Entrada;
    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrarServico(): void{
        console.log(`\nInício do cadastro do serviço: `);
        let nome = this.entrada.receberTexto(`Por favor, insira o nome do serviço prestado: `)
        let descricao = this.entrada.receberTexto(`Agora a descrição deste serviço: `)
        let preco = this.entrada.receberNumero(`E agora, por favor, insira o preço desse serviço (em reais): `)
        let novoServico = new Servico(nome,descricao,preco)
        this.servicos.push(novoServico);
        console.log(`\nCadastro de serviço concluído :)\n`);
    }
}