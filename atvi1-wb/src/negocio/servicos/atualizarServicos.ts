import Entrada from "../../io/entrada";
import Servico from "../../modelo/produto-servico/servico";
import Atualizar from "../atualizar";

export default class AtualizarServico extends Atualizar {
    public atualizar(): void {
        throw new Error("Method not implemented.");
    }
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public atualizarServico(): void {
        console.log(`Escolha a opção de busca:`);
        console.log(`1 - Procurar por Nome`);
        console.log(`2 - Procurar por ID`);

        let opcaoBusca = this.entrada.receberNumero('Insira a opção de busca desejada: ');

        if (opcaoBusca === 1) {
            for (let indexServico = 0; indexServico < this.servicos.length; indexServico++) {
                console.log(indexServico +" - " + this.servicos[indexServico].getNome);
            }
            let nome = this.entrada.receberTexto('Insira o nome do serviço que deseja atualizar: ');

            const index = this.servicos.findIndex(s => s.getNome === nome);

            this.atualizarServicoDetalhado(index);
        } else if (opcaoBusca === 2) {
            for (let indexServico = 0; indexServico < this.servicos.length; indexServico++) {
                console.log(indexServico +" - " + this.servicos[indexServico].getNome);
            }
            let id = this.entrada.receberNumero('Insira o ID do serviço que deseja atualizar: ');

            if (id >= 0 && id < this.servicos.length) {
                this.atualizarServicoDetalhado(id);
            } else {
                console.log(`ID inválido.`);
            }
        } else {
            console.log(`Opção inválida.`);
        }

        console.log(`--------------------------------------`);
    }

    private atualizarServicoDetalhado(index: number): void {
        if (index !== -1) {
            const servico = this.servicos[index];

            let operacao = true;

            while (operacao) {
                console.log(`--------------------------------------`);
                console.log(`Escolha a opção que quer atualizar:`);
                console.log(`1 - Nome`);
                console.log(`2 - Descrição`);
                console.log(`3 - Preço`);
                console.log(`0 - Voltar`);

                let opcao = this.entrada.receberNumero('Insira qual informação será alterada: ');

                switch (opcao) {
                    case 1:
                        let novoNome = this.entrada.receberTexto('Insira o novo nome do serviço: ');
                        servico.setNome(novoNome);
                        break;
                    case 2:
                        let novaDescricao = this.entrada.receberTexto('Insira a nova descrição do serviço: ');
                        servico.setDescricao(novaDescricao);
                        break;
                    case 3:
                        let novoPreco = this.entrada.receberNumero('Insira o novo preço do serviço: ');
                        servico.setPreco(novoPreco);
                        break;
                    case 0:
                        operacao = false;
                        break;
                    default:
                        console.log(`Operação não entendida :(`);
                }
            }
            console.log(`Serviço atualizado!`);
        } else {
            console.log(`Índice inválido.`);
        }
        console.log(`--------------------------------------`);
    }
}