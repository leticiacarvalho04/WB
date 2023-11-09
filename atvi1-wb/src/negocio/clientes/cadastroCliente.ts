import Entrada from "../../io/entrada";
import Cliente from "../../modelo/clientes/cliente";
import CPF from "../../modelo/clientes/cpf";
import RG from "../../modelo/clientes/rg";
import Telefone from "../../modelo/clientes/telefone";
import Produto from "../../modelo/produto-servico/produto";
import Servico from "../../modelo/produto-servico/servico";
import Cadastro, { CadastroPro } from "../cadastro";
import CadastroProduto from "../produtos/cadastroProduto";

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    private produto: Array<Produto>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrarCliente(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let genero = this.entrada.receberTexto(`Por favor, informe seu gênero (masculino/feminino): `);
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        let partesData = data.split('/')
        let ano = new Number(partesData[2].valueOf()).valueOf()
        let mes = new Number(partesData[1].valueOf()).valueOf()
        let dia = new Number(partesData[0].valueOf()).valueOf()
        let dataEmissao = new Date(ano, mes, dia)
        let qtdRG = this.entrada.receberNumero(`Por favor, a quantidade de RG: `) 

        let cliente = new Cliente(nome, nomeSocial, new CPF(valor, dataEmissao), genero, new RG(valor, dataEmissao));
        
        for (var x = 1; x <= qtdRG; x++ ) {
            let valorRG = this.entrada.receberTexto(`Por favor, informe o RG ${x}: `) 
            let dataRG = this.entrada.receberTexto(`Por favor, informe a data de emissão do RG, no padrão dd/mm/yyyy: `)

            let partesDataRG = dataRG.split('/')
            let anoRG = new Number(partesDataRG[2].valueOf()).valueOf()
            let mesRG = new Number(partesDataRG[1].valueOf()).valueOf()
            let diaRG = new Number(partesDataRG[0].valueOf()).valueOf()
            let dataEmissaoRG = new Date(anoRG, mesRG, diaRG)

            let rg = new RG (valorRG, dataEmissaoRG)
            cliente.getRgs.push(rg) // Adicionando o RG ao cliente
        }

        let qtdTelefone = this.entrada.receberNumero(`Por favor, a quantidade de telefones: `) 
        for (var y = 1; y <= qtdTelefone; y++ ) {
            let ddd = this.entrada.receberTexto(`Por favor, informe o DDD: `)
            let numero = this.entrada.receberTexto(`Por favor, informe o telefone ${y}: `) 
            let telefone = new Telefone(ddd,numero);
            cliente.getTelefones.push(telefone); 
        }

        let cpf = new CPF(valor, dataEmissao);
        cliente.setCpf(cpf);
        
        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`);
    }
}
