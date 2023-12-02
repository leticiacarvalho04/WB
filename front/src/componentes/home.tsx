import React, { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './home.css';
import axios from "axios";

interface ProdutosMaisConsumidos{
    nomeProduto: string,
    count: number
}

interface ServicosMaisConsumidos{
    nomeServico: string,
    count: number
}

interface QntServico{
    servicoNome: string;
    count: number;
}

interface QntProduto{
    id: number;
    produtoNome: string;
    count: number;
}

interface ClienteMaisConsumidor {
    nome: string;
    produtosConsumidos: number;
    servicosConsumidos: number;
}

interface ClienteMaisGastou {
    nome: string;
    totalGasto: number;
}

export default function Home() {
    const [top10Clientes, setTop10Clientes] = useState<ClienteMaisConsumidor[]>([]);
    const [ produtosMaisConsumidos, setProdutosMaisConsumidos] = useState<ProdutosMaisConsumidos[]>([])
    const [ servicosMaisConsumidos, setservicosMaisConsumidos] = useState<ServicosMaisConsumidos[]>([])
    const [produtosGeneroFeminino, setProdutosGeneroFeminino] = useState<QntProduto[]>([]);
    const [produtosGeneroMasculino, setProdutosGeneroMasculino] = useState<QntProduto[]>([]);
    const [servicosGeneroFeminino, setServicosGeneroFeminino] = useState<QntServico[]>([]);
    const [servicosGeneroMasculino, setServicosGeneroMasculino] = useState<QntServico[]>([]);
    const [ clienteGastos, setclienteGastos ] = useState<ClienteMaisGastou[]>([])

    useEffect(() => {
        let tabs = document.querySelectorAll('.tabs');
        let instance = M.Tabs.init(tabs, {});
        fetchClientesMaisConsumidores();
        fetchProdutosMaisConsumidos();
        fetchServicosMaisConsumidos();
        produtosGeneroFemininoRequest();
        produtosGeneroMasculinoRequest();
        servicosGeneroFemininoRequest();
        servicosGeneroMasculinoRequest();
        ClientesMaisConsumidoresValor();
    }, []);

    const fetchClientesMaisConsumidores = () => {
        axios.get('http://localhost:5001/clientes/maisConsumidores')
            .then(response => {
                console.log(response.data); // Verifique os dados recebidos no console
                setTop10Clientes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar os dados:', error);
            });
    }

    const ClientesMaisConsumidoresValor = ()=>{
        axios.get('http://localhost:5001/clientes/maisConsumidoresValor')
        .then(response => {
            console.log(response.data); // Verifique os dados recebidos no console
            setclienteGastos(response.data);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
        });
    }

    const fetchProdutosMaisConsumidos = ()=>{
        axios.get('http://localhost:5001/produtos/maisConsumidos')
        .then(response => {
            const produtosConsumidos: ProdutosMaisConsumidos[] = response.data.map((item: any) => ({
                nomeProduto: item.nomeProduto,
                count: item.count
            }));
            setProdutosMaisConsumidos(produtosConsumidos);
            console.log(produtosConsumidos);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error)
        });
    }

    const fetchServicosMaisConsumidos = ()=>{
        axios.get('http://localhost:5001/servicos/maisConsumidos')
        .then(response => {
            const servicosConsumidos: ServicosMaisConsumidos[] = response.data.map((item: any) => ({
                nomeServico: item.nomeServico,
                count: item.count
            }));
            setservicosMaisConsumidos(servicosConsumidos);
            console.log(servicosConsumidos);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error)
        });
    }

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
                    servicoNome: item.servicoNome,
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
                    servicoNome: item.servicoNome,
                    count: item.count
                }));
                setServicosGeneroMasculino(servicosConsumidos);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }

    return (
        <>
            <div className="cards-container">
                <div className="row center-align">
                    <div className="dois">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Clientes Mais Consumidores</span>
                                <ul className="collection">
                                    {top10Clientes.slice(0, 5).map((cliente, index) => (
                                        <li key={index} className="collection-item">
                                            {cliente.nome}: {cliente.produtosConsumidos + cliente.servicosConsumidos} unidades
                                        </li>
                                    ))}
                                </ul>
                                <p><a href="/listagem#clienteTab">Visualizar a lista completa</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="tres">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Clientes que Mais Gastaram</span>
                                <ul className="collection">
                                    {clienteGastos.slice(0, 5).map((cliente, index) => (
                                        <li key={index} className="collection-item">
                                            {cliente.nome}: R$ {cliente.totalGasto}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="row center-align">
                    <div className="">
                        <div className="card medium">
                            <div className="card-content">
                                <span className="card-title">Produtos e Serviços Mais Consumidos</span>
                                <div className="card-tabs">
                                    <ul className="tabs tabs-fixed-width">
                                        <li className="tab"><a href="#produtos">Produtos</a></li>
                                        <li className="tab"><a href="#servicos">Serviços</a></li>
                                    </ul>
                                    <div className="row">
                                        <div id="produtos" className="col s12">
                                            <ul className="collection">
                                                {produtosMaisConsumidos.slice(0, 4).map((produto, index) => (
                                                    <li key={index} className="collection-item">
                                                        {produto.nomeProduto}: {produto.count} unidades
                                                    </li>
                                                ))}
                                            </ul>
                                            <p><a href="/listagem#produtoTab">Visualizar a lista completa</a></p>
                                        </div>
                                        <div id="servicos" className="col s12">
                                            <ul className="collection">
                                                {servicosMaisConsumidos.slice(0, 4).map((servico, index) => (
                                                    <li key={index} className="collection-item">
                                                        {servico.nomeServico}: {servico.count} unidades
                                                    </li>
                                                ))}
                                            </ul>
                                            <p><a href="/listagem#servicoTab">Visualizar a lista completa</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="card medium">
                                <div className="card-content">
                                    <div className="row">
                                        <span className="card-title">Produtos Mais Consumidos por Gênero</span>
                                        <div className="card-tabs">
                                            <ul className="tabs tabs-fixed-width">
                                                <li className="tab"><a href="#feminino">Feminino</a></li>
                                                <li className="tab"><a href="#masculino">Masculino</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        {/* Tab Feminino */}
                                        <div id="feminino">
                                            <ul className="collection">
                                                {produtosGeneroFeminino.slice(0, 4).map((produto, index) => (
                                                    <li key={index} className="collection-item">
                                                        {produto.produtoNome}: {produto.count} unidades
                                                    </li>
                                                ))}
                                            </ul>
                                            <p><a href="/listagem#produtoTab">Visualizar a lista completa</a></p>
                                        </div>
                                        {/* Tab Masculino */}
                                        <div id="masculino">
                                            <ul className="collection">
                                                {produtosGeneroMasculino.slice(0, 4).map((produto, index) => (
                                                    <li key={index} className="collection-item">
                                                        {produto.produtoNome}: {produto.count} unidades
                                                    </li>
                                                ))}
                                            </ul>
                                            <p><a href="/listagem#produtoTab">Visualizar a lista completa</a></p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }