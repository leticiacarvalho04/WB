import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const clientes = [
    { id: '1', nome: 'João da Silva', cpf: '12345678900' },
    { id: '2', nome: 'Maria Oliveira', cpf: '98765432100' },
    { id: '3', nome: 'Lucas Oliveira', cpf: '55555555500' },
    // adicione mais produtos conforme necessário
];

function buscarCliente(query) {
    if (clientes.some(cliente => cliente.id === query)) {
        return clientes.find(cliente => cliente.id === query);
    } else if (clientes.some(cliente => cliente.cpf === query)) {
        return clientes.find(cliente => cliente.cpf === query);
    } else if (clientes.some(cliente => cliente.nome.toLowerCase() === query.toLowerCase())) {
        return clientes.find(cliente => cliente.nome.toLowerCase() === query.toLowerCase());
    }
    return null;
}

export default function ClienteDetails(props) {
    const [state, setState] = useState({
        id: props.id,
        nome: '',
        cpf: props.cpf,
        metodoSelecionado: '',
        buscou: false,
    });

    const navigate = useNavigate();

    const handleMetodoChange = (event) => {
        setState({
            ...state,
            metodoSelecionado: event.target.value,
        });
    };

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value,
        });
    };

    const handleBuscarClick = () => {
        const { metodoSelecionado } = state;

        let cliente;
        if (metodoSelecionado) {
            if (metodoSelecionado === '1' && state.cpf) {
                cliente = buscarCliente(state.cpf);
            } else if (metodoSelecionado === '2' && state.nome) {
                cliente = buscarCliente(state.nome);
            } else if (metodoSelecionado === '3' && state.id) {
                cliente = buscarCliente(state.id);
            }
        }

        if (cliente) {
            setState({
                id: cliente.id,
                nome: cliente.nome,
                cpf: cliente.cpf,
                metodoSelecionado: '',
                buscou: true,
            });
        }
    };

    const handleDeletarClick = () => {
        alert('Cliente deletado!');
    };

    const renderInputs = () => {
        const { metodoSelecionado } = state;

        return (
            <>
                {metodoSelecionado === '1' && (
                    <div className="input-field col s12">
                        <input
                            id="cpf"
                            type="text"
                            className="validate"
                            value={state.cpf}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="cpf">CPF</label>
                    </div>
                )}
                {metodoSelecionado === '2' && (
                    <div className="input-field col s12">
                        <input
                            id="nome"
                            type="text"
                            className="validate"
                            value={state.nome}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="nome">Nome</label>
                    </div>
                )}
                {metodoSelecionado === '3' && (
                    <div className="input-field col s12">
                        <input
                            id="id"
                            type="text"
                            className="validate"
                            value={state.id}
                            onChange={handleInputChange}
                        />
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
    };

    const renderDetalhesCliente = () => {
        const { nome, cpf, id } = state;

        return (
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Detalhes do Cliente</span>
                    <p>Nome: {nome}</p>
                    <p>ID: {id}</p>
                    <p>CPF: {cpf}</p>
                    <button className="btn waves-effect waves-light" onClick={handleDeletarClick}>
                        Deletar
                        <i className="material-icons right">delete</i>
                    </button>
                    <button className="btn waves-effect waves-light" onClick={handleAtualizarClick}>
                        Atualizar
                        <i className="material-icons right">edit</i>
                    </button>
                </div>
            </div>
        );
    };

    const handleAtualizarClick = () => {
        navigate(`/atualizacaoCliente`);
    };

    return (
        <div className="row center-align">
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Buscar Cliente</span>
                    <div className="input-field col s12">
                        <option value="" disabled></option>
                        <select
                            id="metodo"
                            className="browser-default"
                            onChange={handleMetodoChange}
                            value={state.metodoSelecionado}
                        >
                            <option value=''></option>
                            <option value="1">Procurar por CPF</option>
                            <option value="2">Procurar por Nome</option>
                            <option value="3">Procurar por ID</option>
                        </select>
                        <label>Método de Busca</label>
                    </div>
                    {renderInputs()}
                    <div className="input-field col s12">
                        <button className="btn waves-effect waves-light" onClick={handleBuscarClick}>
                            Buscar
                            <i className="material-icons right">search</i>
                        </button>
                    </div>
                    {((state.nome || state.id || state.cpf) && state.buscou) && (
                        renderDetalhesCliente()
                    )}
                </div>
            </div>
        </div>
    );
}