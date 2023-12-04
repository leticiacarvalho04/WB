import React, { useState, useEffect } from "react";
import axios from "axios";
//import './listagem.css';
import 'materialize-css/dist/css/materialize.min.css';

interface Cliente {
    nome: string;
    produtosConsumidos: number;
    servicosConsumidos: number;
}

interface Produto {
    id: number;
    nome: string;
    preco: number;
    quantidadeEstoque: number;
}

interface QntProduto {
    id: number;
    produtoNome: string;
    count: number;
}

interface Servico {
    name: string;
    price: number;
}

interface QntServico {
    nomeServico: string;
    count: number;
}

export default function Listagem() {
    const [top10Clientes, setTop10Clientes] = useState<Cliente[]>([]);
    const [low10Clientes, setLow10Clientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [produtosGeneroFeminino, setProdutosGeneroFeminino] = useState<QntProduto[]>([]);
    const [produtosGeneroMasculino, setProdutosGeneroMasculino] = useState<QntProduto[]>([]);
    const [servicosGeneroFeminino, setServicosGeneroFeminino] = useState<QntServico[]>([]);
    const [servicosGeneroMasculino, setServicosGeneroMasculino] = useState<QntServico[]>([]);

    useEffect(() => {
        let tabs = document.querySelectorAll('.tabs');
        let instance = M.Tabs.init(tabs, {});
        fetchClientesMaisConsumidores();
        clientesMenosConsumidores();
        fetchProdutos();
        fetchServicos();
        produtosGeneroFemininoRequest();
        produtosGeneroMasculinoRequest();
        servicosGeneroFemininoRequest();
        servicosGeneroMasculinoRequest();
    }, []);

    const fetchClientesMaisConsumidores = () => {
        axios.get("http://localhost:5001/clientes/maisConsumidores")
            .then((response) => {
                setTop10Clientes(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    };



    const clientesMenosConsumidores = () => {
        axios.get('http://localhost:5001/clientes/menosConsumidores')
            .then((response) => {
                setLow10Clientes(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    };

    const fetchProdutos = () => {
        axios.get('http://localhost:5001/produto')
            .then((response) => {
                console.log(response.data); // Log the data to check it
                setProdutos(response.data);
            })
            .catch((err) => console.log(err));
    };

    const fetchServicos = () => {
        axios.get('http://localhost:5001/servicos')
            .then((response) => {
                console.log('Dados de serviços:', response.data);
                setServicos(response.data);
            })
            .catch((err) => console.log(err));
    };

    const produtosGeneroFemininoRequest = () => {
        axios.get('http://localhost:5001/produtos/maisConsumidosPorGenero/Feminino')
            .then((response) => {
                const produtosConsumidos: QntProduto[] = response.data.map((item: any) => ({
                    produtoNome: item.produtoNome,
                    count: item.count
                }));
                setProdutosGeneroFeminino(produtosConsumidos);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }

    const produtosGeneroMasculinoRequest = () => {
        axios.get('http://localhost:5001/produtos/maisConsumidosPorGenero/Masculino')
            .then((response) => {
                const produtosConsumidos: QntProduto[] = response.data.map((item: any) => ({
                    produtoNome: item.produtoNome,
                    count: item.count
                }));
                setProdutosGeneroMasculino(produtosConsumidos);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }

    const servicosGeneroFemininoRequest = () => {
        axios.get('http://localhost:5001/servicos/maisConsumidosPorGenero/Feminino')
            .then((response) => {
                console.log('Dados de serviços por gênero feminino:', response.data); // Adição para verificar os dados recebidos
                const servicosConsumidos: QntServico[] = response.data.map((item: any) => ({
                    nomeServico: item.nomeServico,
                    count: item.count
                }));
                setServicosGeneroFeminino(servicosConsumidos);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }

    const servicosGeneroMasculinoRequest = () => {
        axios.get('http://localhost:5001/servicos/maisConsumidosPorGenero/Masculino')
            .then((response) => {
                console.log('Dados de serviços por gênero masculino:', response.data); // Adição para verificar os dados recebidos
                const servicosConsumidos: QntServico[] = response.data.map((item: any) => ({
                    nomeServico: item.nomeServico,
                    count: item.count
                }));
                setServicosGeneroMasculino(servicosConsumidos);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }

    return (
        <div className="row center-align">
            <div className="col s12">
                <ul className="tabs">
                    <li className="tab col s4">
                        <a href="#produtoTab">Listagem Produto</a>
                    </li>
                    <li className="tab col s4">
                        <a href="#servicoTab">Listagem Serviço</a>
                    </li>
                    <li className="tab col s4">
                        <a href="#clienteTab">Listagens Relacionadas aos Clientes</a>
                    </li>
                </ul>
            </div>
            <div id="produtoTab" className="col s12">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Listar Produto</span>
                        <div>
                            {produtos.map((produto, index) => {
                                console.log(`Mapeando produto ${index}`);
                                return (
                                    <div key={index}>
                                        <p>{produto.nome} - Preço: {produto.preco} - Quantidade: {produto.quantidadeEstoque}</p>
                                        <br />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Produtos mais consumidos por gênero</span>
                        <div>
                            <br />
                            <p><strong>Gênero Feminino</strong></p>
                            {produtosGeneroFeminino.map((produto, index) => (
                                <div key={index}>
                                    <p>{index + 1} - {produto.produtoNome} - Quantidade: {produto.count}</p>
                                    <br />
                                </div>
                            ))}
                        </div>
                        <div>
                            <br />
                            <p><strong>Gênero Masculino</strong></p>
                            {produtosGeneroMasculino.map((produto, index) => (
                                <div key={index}>
                                    <p>{index + 1} - {produto.produtoNome} - Quantidade: {produto.count}</p>
                                    <br />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div id="servicoTab" className="col s12">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Listar serviços</span>
                        <div>
                            {servicos && servicos.map((servico, index) => (
                                <div key={index}>
                                    <p>{servico.name} - Preço: {servico.price}</p>
                                    <br />
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Serviços mais consumidos por gênero</span>
                        <div>
                            <p><strong>Gênero Feminino</strong></p>
                            {servicosGeneroFeminino.map((servico, index) => (
                                <div key={index}>
                                    <p>{index + 1} - {servico.nomeServico} - Quantidade: {servico.count}</p>
                                    <br />
                                </div>
                            ))}
                        </div>
                        <div>
                            <br />
                            <p><strong>Gênero Masculino</strong></p>
                            {servicosGeneroMasculino.map((servico, index) => (
                                <div key={index}>
                                    <p>{index + 1} - {servico.nomeServico} - Quantidade: {servico.count}</p>
                                    <br />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div id="clienteTab" className="col s12">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Top 10 clientes que mais consumiram</span>
                        <ul className="collection">
                            {top10Clientes.map((cliente: Cliente, index: number) => (
                                <li key={index} className="collection-item">
                                    {cliente.nome}: {cliente.produtosConsumidos + cliente.servicosConsumidos} unidades
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Top 10 clientes que menos consumiram</span>
                        <ul className="collection">
                            {low10Clientes.map((cliente: Cliente, index: number) => (
                                <li key={index} className="collection-item">
                                    {cliente.nome}: {cliente.produtosConsumidos + cliente.servicosConsumidos} unidades
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}