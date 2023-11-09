import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';

type Props = {
    id: string,
    tema: string;
    cpf: string;
};

interface State {
    activeTab: string;
    id: string,
    nome: string;
    tema: string;
    cpf: string;
    metodoSelecionado: string;
    buscou: boolean;
}

const clientes = [
    { id: '1', nome: 'João da Silva', cpf:'12345678900' },
    { id: '2', nome: 'Maria Oliveira', cpf:'98765432100' },
    { id: '3', nome: 'Lucas Oliveira', cpf:'55555555500' },
    // adicione mais produtos conforme necessário
];

function buscarCliente(query: string) {
    // verifica se a consulta é um ID
    if (clientes.some(cliente => cliente.id === query)) {
        return clientes.find(cliente => cliente.id === query);
    }
    // verifica se a consulta é um CPF
    else if (clientes.some(cliente => cliente.cpf === query)) {
        return clientes.find(cliente => cliente.cpf === query);
    }
    // se não for um ID ou CPF, assume que é um nome
    else if (clientes.some(cliente => cliente.nome.toLowerCase() === query.toLowerCase())) {
        return clientes.find(cliente => cliente.nome.toLowerCase() === query.toLowerCase());
    }

    // retorna null se o cliente não for encontrado
    return null;
}
export default class ClienteDetails extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: 'delete',
            id: props.id,
            nome: '',
            tema: props.tema,
            cpf: props.cpf,
            metodoSelecionado: '',
            buscou: false
        };
    }

    handleMetodoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            metodoSelecionado: event.target.value
        });
    }

    handleBuscarClick = () => {
        const { metodoSelecionado, cpf, nome, id } = this.state;
    
        let cliente;
        if (metodoSelecionado) {
            if (metodoSelecionado === '1' && cpf) {
                console.log(`Busca por CPF: ${cpf}`);
                cliente = buscarCliente(cpf)
            } else if (metodoSelecionado === '2' && nome) {
                console.log(`Busca por Nome: ${nome}`);
                cliente = buscarCliente(nome)
            } else if (metodoSelecionado === '3' && id) {
                console.log(`Busca por ID: ${id}`);
                cliente = buscarCliente(id)
            } 
            
        }
        
        if (cliente){
            this.setState({
                id: cliente.id,
                nome: cliente.nome,
                cpf: cliente.cpf,
                buscou: true
            })
        }
    }
    
    renderInputs() {
        const { metodoSelecionado } = this.state;
    
        return (
            <>
                {metodoSelecionado === '1' && (
                    <div className="input-field col s12">
                        <input id="cpf" type="text" className="validate" value={this.state.cpf} onChange={(e) => this.setState({ cpf: e.target.value })} />
                        <label htmlFor="cpf">CPF</label>
                    </div>
                )}
                {metodoSelecionado === '2' && (
                    <div className="input-field col s12">
                        <input id="nome" type="text" className="validate" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                        <label htmlFor="nome">Nome</label>
                    </div>
                )}
                {metodoSelecionado === '3' && (
                    <div className="input-field col s12">
                        <input id="id" type="text" className="validate" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} />
                        <label htmlFor="id">ID</label>
                    </div>
                )}
                <div>
                    <ul>
                        <li>1 - João da Silva (CPF: 12345678900)</li>
                        <li>2 - Maria Oliveira (CPF: 98765432100)</li>
                        <li>3 - Lucas Oliveira (CPF: 55555555500)</li>
                    </ul>
                </div>
            </>
        );
    }
    
    handleDeletarClick = () => {
        alert('Cliente deletado!');
    }    

    handleTabClick = (tabName: string) => {
        this.setState({
            activeTab: tabName
        });
    }

    componentDidMount() {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
    }

    render() {
        let estilo = `collection-item active ${this.props.tema}`;
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`;
        
        return (
            <div className="row center-align">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s6" onClick={() => this.handleTabClick('delete')}>
                            <a className={this.state.activeTab === 'delete' ? 'active' : ''} href="#deleteTab">Deletar Cliente</a>
                        </li>
                        <li className="tab col s6" onClick={() => this.handleTabClick('update')}>
                            <a className={this.state.activeTab === 'update' ? 'active' : ''} href="#updateTab">Atualizar Cadastro</a>
                        </li>
                    </ul>
                </div>
                <div id="deleteTab" className={`col s12 ${this.state.activeTab === 'delete' ? 'active' : ''}`}>                    {/* Conteúdo para deletar cliente */}
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Deletar Cliente</span>
                            <div className="input-field col s12">
                                <option value="" disabled></option>
                                <select
                                    id="metodo"
                                    className="browser-default"
                                    onChange={this.handleMetodoChange}
                                    value={this.state.metodoSelecionado}
                                >
                                    <option value=''></option>
                                    <option value="1">Procurar por CPF</option>
                                    <option value="2">Procurar por Nome</option>
                                    <option value="3">Procurar por ID</option>
                                </select>
                                <label>Método de Busca</label>
                            </div>{this.renderInputs()}
                            <div className="input-field col s12">
                                <button className="btn waves-effect waves-light" onClick={this.handleBuscarClick}>
                                    Buscar
                                    <i className="material-icons right">search</i>
                                </button>
                            </div>
                            {((this.state.nome || this.state.id || this.state.cpf) && this.state.buscou) && (
                                <div>
                                    <p>Nome: {this.state.nome}</p>
                                    <p>ID: {this.state.id}</p>
                                    <p>CPF: {this.state.cpf}</p>
                                    <button className="btn waves-effect waves-light" onClick={this.handleDeletarClick}>
                                        Deletar
                                        <i className="material-icons right">delete</i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div id="updateTab" className={`col s12 ${this.state.activeTab === 'update' ? 'active' : ''}`}>
                    {/* Conteúdo para atualizar cadastro */}
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Atualizar Cadastro</span>
                            <div className="input-field col s12">
                                <input id="nome" type="text" className="validate" />
                                <label htmlFor="nome">Nome</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="nome_social" type="text" className="validate" />
                                <label htmlFor="nome_social">Nome social</label>
                            </div>
                            <div className="input-field col s12">
                            <option value="" disabled>Gênero</option>
                                <select id="genero" className="browser-default">
                                <option value="" disabled>Escolha o gênero</option>
                                <option value="1">Masculino</option>
                                <option value="2">Feminino</option>
                                <option value="3">Outro</option>
                                </select>
                            </div>
                            <div className="input-field col s12">
                                <input id="cpf" type="text" className="validate" />
                                <label htmlFor="cpf">N° CPF</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="data_emissao_cpf" type="text" className="validate" />
                                <label htmlFor="data_emissao_cpf">Data de emissão do CPF</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="quantidade_rg" type="text" className="validate" />
                                <label htmlFor="quantidade_rg">Quantidade de RG</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="rg" type="text" className="validate" />
                                <label htmlFor="rg">N° de RG</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="data_emissao_rg" type="text" className="validate" />
                                <label htmlFor="data_emissao_rg">Data de emissão do RG</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="telefone" type="text" className="validate" />
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col s12">
                                <button className={estiloBotao} type="submit" name="action">
                                Submit
                                <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom: '20px' }}></div>
                    </div>
                </div>
            </div>
        );
    }
}
