import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './compra.css'

type Props = {
    id: string,
    cpf: string,
    tema: string;
};

interface State {
    activeTab: string;
    id: string,
    nome: string;
    tema: string;
    cpf: string;
    produto: string;
    servico: string;
    buscou: boolean;
    metodoSelecionado: string;
    mSelecionado: string;
}

const clientes = [
    { id: '1', nome: 'João da Silva', cpf:'12345678900' },
    { id: '2', nome: 'Maria Oliveira', cpf:'98765432100' },
    { id: '3', nome: 'Lucas Oliveira', cpf:'55555555500' }
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


export default class Compra extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: 'delete',
            id: props.id,
            nome: '',
            cpf: props.cpf,
            tema: props.tema,
            metodoSelecionado: '',
            produto: '',
            servico: '',
            buscou: false,
            mSelecionado: ''
        };
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    handleSelectionChange(event: any) {
        this.setState({ mSelecionado: event.target.value });
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
        alert('Serviço deletado!');
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
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`;
        
        return (
            <div className="row center-align">
                <div className="searchTab">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Comprar Produto ou Serviço</span>
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
                            </div>
                            {this.renderInputs()}
                            <div className="input-field col s12">
                                <button className="btn waves-effect waves-light" onClick={this.handleBuscarClick}>
                                    Buscar
                                    <i className="material-icons right">search</i>
                                </button>
                            </div>
                            {((this.state.nome || this.state.id || this.state.cpf) && this.state.buscou) && (
                            <div className="row">
                                <div className="col s6 offset-s3 m1">
                                    <form className="col s12">
                                        <div className="row">
                                            <label htmlFor="compra">Escolha o que foi consumido</label>
                                            <div className="input-field col s12">
                                                <select id="compra" className="browser-default" onChange={this.handleSelectionChange}>
                                                    <option value="">Escolha o que foi consumido</option>
                                                    <option value="Produto">Produto</option>
                                                    <option value="Servico">Serviço</option>
                                                </select>
                                            </div>
                                            {this.state.mSelecionado === 'Produto' && (
                                                <div className="input-field col s12">
                                                    <input id="id_pro" type="text" className="validate" />
                                                    <label htmlFor="id_pro">Insira o n° do produto consumido</label>
                                                </div>
                                            )}
                                            {this.state.mSelecionado === 'Servico' && (
                                                <div className="input-field col s12">
                                                    <input id="id_pro" type="text" className="validate" />
                                                    <label htmlFor="id_pro">Insira o n° do serviço consumido</label>
                                                </div>
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col s12">
                                                <button className={estiloBotao} type="submit" name="action" onClick={() => alert('Comprado com sucesso!')}>
                                                    Submit
                                                    <i className="material-icons right">send</i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}