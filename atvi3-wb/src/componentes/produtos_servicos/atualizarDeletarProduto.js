import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './produto.css'

const produtos = [
    { id: '1', nome: 'Perfume feminino' },
    { id: '2', nome: 'Batom matte' },
    { id: '3', nome: 'Perfume masculino' },
    // adicione mais produtos conforme necessário
];

function buscarProduto(query) {
    // verifica se a consulta é um ID
    if (produtos.some(produto => produto.id === query)) {
        return produtos.find(produto => produto.id === query);
    }

    // se não for um ID, assume que é um nome
    return produtos.find(produto => produto.nome.toLowerCase() === query.toLowerCase());
}

export default function ProdutoDetails(props) {
    const [activeTab, setActiveTab] = useState('delete');
    const [id, setId] = useState(props.id);
    const [nome, setNome] = useState('');
    const [tema, setTema] = useState(props.tema);
    const [metodoSelecionado, setMetodoSelecionado] = useState('');
    const [buscou, setBuscou] = useState(false);

    const handleMetodoChange = (event) => {
        setMetodoSelecionado(event.target.value);
    }

    const handleBuscarClick = () => {
        let produto;
        if (metodoSelecionado) {
            if (metodoSelecionado === '1' && id) {
                console.log(`Busca por ID: ${id}`);
                produto = buscarProduto(id);
            } else if (metodoSelecionado === '2' && nome) {
                console.log(`Busca por Nome: ${nome}`);
                produto = buscarProduto(nome);
            }
        }
    
        if (produto) {
            setId(produto.id);
            setNome(produto.nome);
            setBuscou(true);
        }
    }
    
    
    const renderInputs = () => {
        return (
            <>
                {metodoSelecionado === '1' && (
                    <div className="input-field col s12">
                        <input id="id" type="text" className="validate" value={id} onChange={(e) => setId(e.target.value)} />
                        <label htmlFor="id">ID</label>
                    </div>
                )}
                {metodoSelecionado === '2' && (
                    <div className="input-field col s12">
                        <input id="nome" type="text" className="validate" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <label htmlFor="nome">Nome</label>
                    </div>
                )}
                <div>
                    <ul>
                        <li>1 - Perfume feminino </li>
                        <li>2 - Batom matte </li>
                        <li>3 - Perfume masculino</li>
                    </ul>
                </div>
            </>
        );
    }
    
    const handleDeletarClick = () => {
        alert('Produto deletado!');
    }    

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    }

    useEffect(() => {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
    }, []);

    let estiloBotao = `btn waves-effect waves-light ${props.tema}`;
        
    return (
        <div className="row center-align">
            <div className="col s12">
                <ul className="tabs">
                    <li className="tab col s6" onClick={() => handleTabClick('delete')}>
                        <a className={activeTab === 'delete' ? 'active' : ''} href="#deleteTab">Deletar Produto</a>
                    </li>
                    <li className="tab col s6" onClick={() => handleTabClick('update')}>
                        <a className={activeTab === 'update' ? 'active' : ''} href="#updateTab">Atualizar Cadastro</a>
                    </li>
                </ul>
            </div>
            <div id="deleteTab" className={`col s12 ${activeTab === 'delete' ? 'active' : ''}`}>                    
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Deletar Produto</span>
                        <div className="input-field col s12">
                            <option value="" disabled></option>
                            <select
                                id="metodo"
                                className="browser-default"
                                onChange={handleMetodoChange}
                                value={metodoSelecionado}
                            >
                                <option value=''></option>
                                <option value="1">Procurar por ID</option>
                                <option value="2">Procurar por Nome</option>
                            </select>
                            <label>Método de Busca</label>
                        </div>{renderInputs()}
                        <div className="input-field col s12">
                            <button className="btn waves-effect waves-light" onClick={handleBuscarClick}>
                                Buscar
                                <i className="material-icons right">search</i>
                            </button>
                        </div>
                        {((nome || id) && buscou) && (
                        <div>
                            <p>Nome: {nome}</p>
                            <p>ID: {id}</p>
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
                            <input id="descricao" type="text" className="validate" />
                            <label htmlFor="descricao">Descrição</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="preco" type="text" className="validate" />
                            <label htmlFor="preco">Preço</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="estoque" type="text" className="validate" />
                            <label htmlFor="estoque">N° de produtos no estoque</label>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className={estiloBotao} type="submit" name="action">
                                Submit
                                <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}></div>
                </div>
            </div>
        </div>
    );
}