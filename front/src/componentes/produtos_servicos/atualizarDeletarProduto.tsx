import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './produto.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Produto {
    id: number;
    nome: string;
    preco: number;
    quantidadeEstoque: number;
}

export default function ProdutoDetails() {
    const [state, setState] = useState({
        id: '',
        produtos: [] as Produto[],
        produtoEncontrado: false,
        mostrarBotaoAtualizar: false
    });

    const navigate = useNavigate();

    const { id, produtos, produtoEncontrado, mostrarBotaoAtualizar } = state;

    const handleBuscarClick = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/produtos/id/${id}`);
            const produto = response.data;
            
            if (produto) {
                console.log('Produto encontrado!');
                setState({
                    ...state,
                    produtoEncontrado: true,
                    mostrarBotaoAtualizar: true
                });
            } else {
                console.log('Produto não encontrado.');
                setState({
                    ...state,
                    produtoEncontrado: false,
                    mostrarBotaoAtualizar: false
                });
            }
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
        }
    };    

    const handleDeletarClick = async () => {
        try {
            await axios.delete(`http://localhost:5001/produto/id/${id}`);
            alert('Produto deletado!');
            console.log('Produto deletado!');
            setState({
                ...state,
                produtoEncontrado: false,
                id: ''
            });
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setState({
            ...state,
            id: value
        });
    };

    const handleSearchButtonClick = () => {
        handleBuscarClick();
    };

    useEffect(() => {
        listarProdutos();
    }, []);

    const listarProdutos = async () => {
        try {
            const response = await axios.get('http://localhost:5001/produto');
            const produtos = response.data.sort((a: Produto, b: Produto) => a.id - b.id);
            setState({ ...state, produtos: produtos });
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
        }
    };

    return (
        <div className="row center-align">
            <div className="col s12">
                <div className="card">
                    <div className="card-content">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="id"
                                value={id}
                                onChange={handleIdChange}
                            />
                            <label htmlFor="id">ID do Produto</label>
                        </div>
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
                        {mostrarBotaoAtualizar && (
                            <button className="btn waves-effect waves-light" onClick={() => navigate(`/atualizacaoProduto/id/${id}`)}>
                                Atualizar
                                <i className="material-icons right">update</i>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
