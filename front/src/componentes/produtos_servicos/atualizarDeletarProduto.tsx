import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './produto.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Produto {
    id: number;
    nome: string;
    preco: number;
    quantidadeEstoque: number;
}

export default function ProdutoDetails() {
    const [state, setState] = useState({
        id: '',
        nome: '',
        metodoSelecionado: '',
        produtos: [] as Produto[],
        activeTab: 'delete',
        produtoEncontrado: false, // Adicionando uma flag para indicar se o produto foi encontrado
        mostrarBotaoAtualizar: false
    });

    const navigate = useNavigate();

    const { id, nome, produtos, metodoSelecionado, activeTab, produtoEncontrado, mostrarBotaoAtualizar } = state;

    const handleMetodoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            metodoSelecionado: event.target.value,
            produtoEncontrado: false,
            id: '',
            nome: '',
        });
    };

    const handleBuscarClick = async () => {
        let produto;
        if (metodoSelecionado === '1') {
            try {
                produto = await axios.get(`http://localhost:5001/produtos/id/${id}`);
            } catch (error) {
                console.error('Erro ao buscar produto por ID:', error);
            }
        } else if(metodoSelecionado === '2'){
            try {
                produto = await axios.get(`http://localhost:5001/produtos/nome/${nome}`);
            } catch (error) {
                console.error('Erro ao buscar produto por nome:', error);
            }
        }
    
        if (produto && produto.data) {
            console.log('Produto encontrado!');
            setState({
                ...state,
                produtoEncontrado: true, // Produto encontrado, atualiza o estado
                mostrarBotaoAtualizar: true
            });
        } else {
            console.log('Produto não encontrado.');
            setState({
                ...state,
                produtoEncontrado: false, // Produto não encontrado, atualiza o estado
                mostrarBotaoAtualizar: true
            });
        }
    };    

    const handleDeletarClick = async () => {
        if (metodoSelecionado === '1') {
            await axios.delete(`http://localhost:5001/produto/id/${id}`);
            alert('Produto deletado!')
        } else {
            await axios.delete(`http://localhost:5001/produto/name/${nome}`);
            alert('Produto deletado!')
        }
        console.log('Produto deletado!');
        setState({
            ...state,
            produtoEncontrado: false, 
            id: '',
            nome: '',
            metodoSelecionado: ''
        });
    };

    const handleIdNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setState({
            ...state,
            [metodoSelecionado === '1' ? 'id' : 'nome']: value
        });
    };

    const handleSearchButtonClick = () => {
        handleBuscarClick();
    };

    const listarProdutos = async () => {
        try {
            const response = await axios.get('http://localhost:5001/produto');
            const produtos = response.data.sort((a: Produto, b: Produto) => a.id - b.id);
            setState({ ...state, produtos: produtos })
            console.log(response.data); // Aqui você pode utilizar a lista de produtos retornada
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
        }
    };

    useEffect(() => {
        let tabs = document.querySelectorAll('.tabs');
        let instance = M.Tabs.init(tabs, {});
        listarProdutos();
    }, []);

    return (
        <div className="row center-align">
            <div className="col s12">
                <ul className="tabs tabs-fixed-width">
                    <li className="tab col s6">
                        <a className={activeTab === 'delete' ? 'active' : ''} href="#deleteTab">Deletar Produto</a>
                    </li>
                    <li className="tab col s6">
                        <a className={activeTab === 'update' ? 'active' : ''} href="#updateTab">Atualizar Cadastro</a>
                    </li>
                </ul>
                <div id="deleteTab" className={`col s12 ${activeTab === 'delete' ? 'active' : ''}`}>
                    {/* Conteúdo para deletar produto */}
                    <div className="card">
                        <div className="card-content">
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
                            </div>
                            {metodoSelecionado && ( 
                                <div className="input-field col s12">
                                    <input
                                        type="text"
                                        id="idNome"
                                        value={metodoSelecionado === '1' ? id : nome}
                                        onChange={handleIdNomeChange}
                                    />
                                    <label htmlFor="idNome">{metodoSelecionado === '1' ? 'ID' : 'Nome'}</label>
                                </div>
                            )}
                            {produtos.map((produto) => (
                                <div key={produto.id}>
                                    <p>{produto.id} - {produto.nome}</p>
                                </div>
                            ))}
                            <button className="btn waves-effect waves-light" onClick={handleSearchButtonClick}>
                                Buscar
                                <i className="material-icons right">search</i>
                            </button>
                            {produtoEncontrado && (
                                <button className="btn waves-effect waves-light" onClick={handleDeletarClick}>
                                    Deletar
                                    <i className="material-icons right">delete</i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div id="updateTab" className={`col s12 ${activeTab === 'update' ? 'active' : ''}`}>
                    {/* Conteúdo para atualizar cadastro */}
                    <div className="card">
                        <div className="card-content">
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
                            </div>
                            {metodoSelecionado && ( 
                                <div className="input-field col s12">
                                    <input
                                        type="text"
                                        id="idNome"
                                        value={metodoSelecionado === '1' ? id : nome}
                                        onChange={handleIdNomeChange}
                                    />
                                    <label htmlFor="idNome">{metodoSelecionado === '1' ? 'ID' : 'Nome'}</label>
                                </div>
                            )}
                            {produtos.map((produto) => (
                                <div key={produto.id}>
                                    <p>{produto.id} - {produto.nome}</p>
                                </div>
                            ))}
                            <button className="btn waves-effect waves-light" onClick={handleSearchButtonClick}>
                                Buscar
                                <i className="material-icons right">search</i>
                            </button>
                            {mostrarBotaoAtualizar && (
                            <div>
                                <button className="btn waves-effect waves-light" onClick={() => navigate(`/atualizacaoProduto/id/${id}`)}>
                                    Atualizar
                                    <i className="material-icons right">update</i>
                                    </button>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}