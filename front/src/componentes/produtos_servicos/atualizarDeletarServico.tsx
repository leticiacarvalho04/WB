import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './produto.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Servico {
    id: number;
    name: string;
    price: number;
}

export default function Servicos() {
    const [state, setState] = useState({
        id: '',
        servicos: [] as Servico[],
        servicoEncontrado: false,
        mostrarBotaoAtualizar: false
    });

    const navigate = useNavigate();

    const { id, servicos, servicoEncontrado, mostrarBotaoAtualizar } = state;

    const handleBuscarClick = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/servicos/id/${id}`);
            const servico = response.data;
            
            if (servico) {
                console.log('Serviço encontrado!');
                setState({
                    ...state,
                    servicoEncontrado: true,
                    mostrarBotaoAtualizar: true
                });
            } else {
                console.log('Produto não encontrado.');
                setState({
                    ...state,
                    servicoEncontrado: false,
                    mostrarBotaoAtualizar: false
                });
            }
        } catch (error) {
            console.error('Erro ao buscar servico por ID:', error);
        }
    };    

    const handleDeletarClick = async () => {
        try {
            await axios.delete(`http://localhost:5001/servicos/id/${id}`);
            alert('Serviço deletado!');
            console.log('Serviço deletado!');
            setState({
                ...state,
                servicoEncontrado: false,
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
            const response = await axios.get('http://localhost:5001/servicos');
            const servicos = response.data.sort((a: Servico, b: Servico) => a.id - b.id);
            setState({ ...state, servicos: servicos });
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
                        {servicos.map((produto) => (
                            <div key={produto.id}>
                                <p>{produto.id} - {produto.name}</p>
                            </div>
                        ))}
                        <button className="btn waves-effect waves-light" onClick={handleSearchButtonClick}>
                            Buscar
                            <i className="material-icons right">search</i>
                        </button>
                        {servicoEncontrado && (
                            <button className="btn waves-effect waves-light" onClick={handleDeletarClick}>
                                Deletar
                                <i className="material-icons right">delete</i>
                            </button>
                        )}
                        {mostrarBotaoAtualizar && (
                            <button className="btn waves-effect waves-light" onClick={() => navigate(`/atualizacaoServico/id/${id}`)}>
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