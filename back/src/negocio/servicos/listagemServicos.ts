import Servico from "../../modelo/produto-servico/servico";
import Listagem from "../listagens/listagem";

export default class ListagemServico extends Listagem {
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
    }
    public listar(): void {
        console.log(`\nLista de todos os serviços:`);
        console.log(`--------------------------------------`);
        this.servicos.forEach(servico => {
            console.log(`Nome: ` + servico.nome);
            console.log(`Descrição: ` + servico.descricao);
            console.log(`Preço: ` + servico.preco);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }    
}