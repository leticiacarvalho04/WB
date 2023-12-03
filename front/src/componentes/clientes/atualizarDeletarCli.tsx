import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './clientes.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface CPF {
    valor: string;
    // outros campos do CPF, se houverem
}

interface Cliente {
    id: number;
    nome: string;
    cpf: CPF;
    // outros campos do Cliente, se houverem
}


export default function ClienteDetails() {
    const [state, setState] = useState({
        cpf: '',
        clientes: [] as Cliente[],
        clientesEncontrado: false,
        mostrarBotaoAtualizar: false
    });

    const navigate = useNavigate();

    const { cpf, clientes, clientesEncontrado, mostrarBotaoAtualizar } = state;

    const handleBuscarClick = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/cliente/cpf/${cpf}`);
            const clientesData = response.data;
            
            if (clientesData) {
                console.log('Cliente encontrado!');
                setState({
                    ...state,
                    clientesEncontrado: true,
                    mostrarBotaoAtualizar: true
                });
            } else {
                console.log('Cliente não encontrado.');
                setState({
                    ...state,
                    clientesEncontrado: false,
                    mostrarBotaoAtualizar: false
                });
            }
        } catch (error) {
            console.error('Erro ao buscar clientes por ID:', error);
        }
    };    

    const handleDeletarClick = async () => {
        try {
            await axios.delete(`http://localhost:5001/clientes/cpf/${cpf}`);
            alert('Cliente deletado!');
            console.log('Cliente deletado!');
            setState({
                ...state,
                clientesEncontrado: false,
                cpf: ''
            });
        } catch (error) {
            console.error('Erro ao deletar clientes:', error);
        }
    };

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setState({
            ...state,
            cpf: value
        });
    };

    const handleSearchButtonClick = () => {
        handleBuscarClick();
    };

    useEffect(() => {
        listarClientes();
    }, []);

    const listarClientes = async () => {
        try {
            const response = await axios.get('http://localhost:5001/clientes');
            const clientesData = response.data.sort((a: Cliente, b: Cliente) => a.id - b.id);
            setState({ ...state, clientes: clientesData });
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao listar clientess:', error);
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
                                value={cpf}
                                onChange={handleIdChange}
                            />
                            <label htmlFor="id">CPF do cliente</label>
                        </div>
                        {clientes.map((cliente: Cliente) => (
                            <div key={cliente.id}>
                                <p>{cliente.id} - {cliente.nome} - {cliente.cpf.valor}</p>
                            </div>
                        ))}
                        <button className="btn waves-effect waves-light" onClick={handleSearchButtonClick}>
                            Buscar
                            <i className="material-icons right">search</i>
                        </button>
                        {clientesEncontrado && (
                            <button className="btn waves-effect waves-light" onClick={handleDeletarClick}>
                                Deletar
                                <i className="material-icons right">delete</i>
                            </button>
                        )}
                        {mostrarBotaoAtualizar && (
                            <button className="btn waves-effect waves-light" onClick={() => navigate(`/atualizacaoCliente/cpf/${cpf}`)}>
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