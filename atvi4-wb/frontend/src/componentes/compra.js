import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './compra.css';

const clientes = [
    { id: '1', nome: 'João da Silva', cpf: '12345678900' },
    { id: '2', nome: 'Maria Oliveira', cpf: '98765432100' },
    { id: '3', nome: 'Lucas Oliveira', cpf: '55555555500' }
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

export default function Compra({ id, cpf, tema }) {
    const [activeTab, setActiveTab] = useState('delete');
    const [nome, setNome] = useState('');
    const [metodoSelecionado, setMetodoSelecionado] = useState('');
    const [produto, setProduto] = useState('');
    const [servico, setServico] = useState('');
    const [buscou, setBuscou] = useState(false);
    const [mSelecionado, setMSelecionado] = useState('');

    useEffect(() => {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
    }, []);

    const handleSelectionChange = (event) => {
        setMSelecionado(event.target.value);
    }

    const handleMetodoChange = (event) => {
        setMetodoSelecionado(event.target.value);
    }

    const handleBuscarClick = () => {
        let cliente;
        if (metodoSelecionado) {
            if (metodoSelecionado === '1' && cpf) {
                console.log(`Busca por CPF: ${cpf}`);
                cliente = buscarCliente(cpf);
            } else if (metodoSelecionado === '2' && nome) {
                console.log(`Busca por Nome: ${nome}`);
                cliente = buscarCliente(nome);
            } else if (metodoSelecionado === '3' && id) {
                console.log(`Busca por ID: ${id}`);
                cliente = buscarCliente(id);
            }
        }

        if (cliente) {
            setNome(cliente.nome);
            setBuscou(true);
        }
    }

    const renderInputs = () => {
        return (
            <>
                {metodoSelecionado === '1' && (
                    <div className="input-field col s12">
                        <input id="cpf" type="text" className="validate" value={cpf} onChange={(e) => setProduto(e.target.value)} />
                        <label htmlFor="cpf">CPF</label>
                    </div>
                )}
                {metodoSelecionado === '2' && (
                    <div className="input-field col s12">
                        <input id="nome" type="text" className="validate" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <label htmlFor="nome">Nome</label>
                    </div>
                )}
                {metodoSelecionado === '3' && (
                    <div className="input-field col s12">
                        <input id="id" type="text" className="validate" value={id} onChange={(e) => setProduto(e.target.value)} />
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

    const handleDeletarClick = () => {
        alert('Serviço deletado!');
    }

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }

    let estiloBotao = `btn waves-effect waves-light ${tema}`;

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
                                onChange={handleMetodoChange}
                                value={metodoSelecionado}
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
                        {((nome || id || cpf) && buscou) && (
                            <div className="row">
                                <div className="col s6 offset-s3 m1">
                                    <form className="col s12">
                                        <div className="row">
                                            <label htmlFor="compra">Escolha o que foi consumido</label>
                                            <div className="input-field col s12">
                                                <select id="compra" className="browser-default" onChange={handleSelectionChange}>
                                                    <option value="">Escolha o que foi consumido</option>
                                                    <option value="Produto">Produto</option>
                                                    <option value="Servico">Serviço</option>
                                                </select>
                                            </div>
                                            {mSelecionado === 'Produto' && (
                                                <div className="input-field col s12">
                                                    <input id="id_pro" type="text" className="validate" />
                                                    <label htmlFor="id_pro">Insira o n° do produto consumido</label>
                                                </div>
                                            )}
                                            {mSelecionado === 'Servico' && (
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