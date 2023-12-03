import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './compra.css';
import axios from "axios";

const selectStyle = {
    width: '100%',
};

interface Servico{
    id: number;
    name: string,
    price: number,
}

interface Produto{
    id: number;
    nome: string;
    descricao: string;
    preco: number;
}
interface CPF{
    valor: string;
}

interface Cliente {
    id: string,
    nome: string,
    cpf: CPF,
}

export default function Compra() {
    const [activeTab, setActiveTab] = useState<string>('delete');
    const [id, setId] = useState<string>();
    const [nome, setNome] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [metodoSelecionado, setMetodoSelecionado] = useState<string>('');
    const [produto, setProduto] = useState<string>('');
    const [servico, setServico] = useState<Servico[]>([]);
    const [servicoId, setServicoId] = useState<string>('');
    const [mSelecionado, setMSelecionado] = useState<string>('');
    const [mostrarCampos, setMostrarCampos] = useState<boolean>(false);

    const [clientes, setClientes] = useState<Cliente[]>([]);
    

    useEffect(() => {
        axios.get('http://localhost:5001/clientes/comprar')
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
    }, []);

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMSelecionado(event.target.value);
    };

    const handleMetodoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMetodoSelecionado(event.target.value);
    };

    const buscarClientePorId = async (id: string): Promise<Cliente | null> => {
        try {
            const response = await axios.get(`http://localhost:5001/cliente/id/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            return null;
        }
    }; 

    const handleBuscarClick = async () => {
        if (id) {
            try {
                const cliente = await buscarClientePorId(id);
                if (cliente) {
                    setId(cliente.id);
                    setNome(cliente.nome);
                    setMostrarCampos(true);
                }
            } catch (error) {
                console.error('Erro ao buscar cliente:', error);
            }
        } else {
            console.error('ID não fornecido');
        }
    };

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
                        {clientes.map((cliente: Cliente) => (
                            <li key={cliente.id}>{`${cliente.id} - ${cliente.nome} (CPF: ${cliente.cpf.valor})`}</li>
                        ))}
                    </ul>
                </div>
            </>
        );
    }
    
    const handleComprarServico = () => {
        if (id && servicoId) {
            const data = { servicoId };
            axios.post(`http://localhost:5001/cliente/id/${id}/servico`, data)
                .then(response => {
                    console.log(response.data);
                    alert('Serviço comprado!');
                })
                .catch(error => {
                    console.error('Erro ao comprar serviço pelo ID:', error);
                });
        } else {
            console.warn('Por favor, forneça o ID do cliente e o ID do serviço para comprar o serviço.');
        }
    };    

    const handleComprarProduto = () => {
        if (metodoSelecionado === '3' && id) {
            axios.get(`http://localhost:5001/cliente/id/${id}/produto`)
                .then(response => {
                    console.log(response.data);
                    alert('Produto comprado!');
                })
                .catch(error => {
                    console.error('Erro ao comprar produto pelo ID:', error);
                });
        } else {
            console.warn('Por favor, selecione o método de busca por ID e forneça o ID do cliente para comprar o produto.');
        }
    };    

    useEffect(() => {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, []);

    let estiloBotao = `btn waves-effect waves-light`;

    return (
        <div className="row center-align">
            <div className="searchTab">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Comprar Produto ou Serviço</span>
                        <div className="input-field col s12">
                            <input id="id" type="text" className="validate" value={id} onChange={(e) => setId(e.target.value)} />
                            <label htmlFor="id">ID</label>
                        </div>
                        {renderInputs()}
                        <div className="input-field col s12">
                            <button className="btn waves-effect waves-light" onClick={handleBuscarClick}>
                                Buscar
                                <i className="material-icons right">search</i>
                            </button>
                        </div>
                        {mostrarCampos && (
                            <div className="row">
                                <div className="col s12">
                                    <form className="col s12">
                                        <div className="row">
                                            <label htmlFor="compra">Escolha o que foi consumido</label>
                                            <div className="input-field col s12">
                                                <select style={selectStyle} id="compra" className="browser-default" onChange={handleSelectionChange}>
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
                                                        <input id="id_servico" type="text" className="validate" value={servicoId} onChange={(e) => setServicoId(e.target.value)} />
                                                        <label htmlFor="id_servico">Insira o n° do serviço consumido</label>
                                                    </div>
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col s12">
                                                {mSelecionado === 'Produto' && (
                                                    <button className={estiloBotao} type="submit" name="action" onClick={handleComprarProduto}>
                                                        Comprar Produto
                                                        <i className="material-icons right">send</i>
                                                    </button>
                                                )}
                                                 {mSelecionado === 'Servico' && (
                                                    <button className={estiloBotao} type="submit" name="action" onClick={handleComprarServico}>
                                                        Comprar Serviço
                                                        <i className="material-icons right">send</i>
                                                    </button>                                                
                                                )}
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