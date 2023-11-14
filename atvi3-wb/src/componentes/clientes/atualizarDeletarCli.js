import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './produto.css'

export default function ClienteDetails(props) {
    const [activeTab, setActiveTab] = useState('delete');
    const [id, setId] = useState(props.id);
    const [nome, setNome] = useState('');
    const [tema, setTema] = useState(props.tema);
    const [cpf, setCpf] = useState(props.cpf);
    const [metodoSelecionado, setMetodoSelecionado] = useState('');
    const [buscou, setBuscou] = useState(false);

    const handleMetodoChange = (event) => {
        setMetodoSelecionado(event.target.value);
    }

    const handleBuscarClick = () => {
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
            setId(cliente.id);
            setNome(cliente.nome);
            setCpf(cliente.cpf);
            setBuscou(true);
        }
    }
    
    const renderInputs = () => {
        return (
            <>
                {metodoSelecionado === '1' && (
                    <div className="input-field col s12">
                        <input id="cpf" type="text" className="validate" value={cpf} onChange={(e) => setCpf(e.target.value)} />
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
                        <input id="id" type="text" className="validate" value={id} onChange={(e) => setId(e.target.value)} />
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
        alert('Cliente deletado!');
    }    

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }

    useEffect(() => {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
    }, []);

    let estilo = `collection-item active ${tema}`;
    let estiloBotao = `btn waves-effect waves-light ${tema}`;
        
    return (
        <div className="row center-align">
            <div className="col s12">
                <ul className="tabs">
                    <li className="tab col s6" onClick={() => handleTabClick('delete')}>
                        <a className={activeTab === 'delete' ? 'active' : ''} href="#deleteTab">Deletar Cliente</a>
                    </li>
                    <li className="tab col s6" onClick={() => handleTabClick('update')}>
                        <a className={activeTab === 'update' ? 'active' : ''} href="#updateTab">Atualizar Cadastro</a>
                    </li>
                </ul>
            </div>
            <div id="deleteTab" className={`col s12 ${activeTab === 'delete' ? 'active' : ''}`}>                    
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Deletar Cliente</span>
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
                        </div>{renderInputs()}
                        <div className="input-field col s12">
                            <button className="btn waves-effect waves-light" onClick={handleBuscarClick}>
                                Buscar
                                <i className="material-icons right">search</i>
                            </button>
                        </div>
                        {((nome || id || cpf) && buscou) && (
                            <div>
                                <p>Nome: {nome}</p>
                                <p>ID: {id}</p>
                                <p>CPF: {cpf}</p>
                                <button className="btn waves-effect waves-light" onClick={handleDeletarClick}>
                                    Deletar
                                    <i className="material-icons right">delete</i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div id="updateTab" className={`col s12 ${activeTab === 'update' ? 'active' : ''}`}>
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