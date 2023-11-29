import React, { useEffect, useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import './home.css';
import axios from "axios";

export default function Home() {
    const [top10Clientes, setTop10Clientes] = useState<ClienteMaisConsumidor[]>([]);

    useEffect(() => {
        fetchClientesMaisConsumidores();
    }, []);

    interface ClienteMaisConsumidor {
        nome: string;
        produtosConsumidos: number;
        servicosConsumidos: number;
    }

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
                <div className="">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Clientes que Mais Gastaram</span>
                            <ul className="collection">
                                <li className="collection-item">Enzo Oliveira: R$ 105.00</li>
                                <li className="collection-item">Luiz Oliveira: R$ 100.00</li>
                                <li className="collection-item">Maria Oliveira: R$ 90.00</li>
                                <li className="collection-item">Luciana Oliveira: R$ 83.00</li>
                                <li className="collection-item">Audrey Duarte: R$ 78.00</li>
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
                                                <li className="collection-item">Perfume Feminino: 2 unidades</li>
                                                <li className="collection-item">Batom Matte: 3 unidades</li>
                                                <li className="collection-item">Sombra em Pó: 3 unidades</li>
                                                <li className="collection-item">Esmalte Duradouro: 2 unidades</li>
                                            </ul>
                                            <p><a href="/listagem#produtoTab">Visualizar a lista completa</a></p>
                                        </div>
                                        <div id="servicos" className="col s12">
                                            <ul className="collection">
                                                <li className="collection-item">Corte de Cabelo: R$ 40,00</li>
                                                <li className="collection-item">Manicure: R$ 70,00</li>
                                                <li className="collection-item">Pedicure: R$ 90,00</li>
                                                <li className="collection-item">Limpeza de Pele: R$ 120,00</li>
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
                                                <li className="collection-item">Perfume Feminino: 1 unidade</li>
                                                <li className="collection-item">Batom Matte: 3 unidades</li>
                                                <li className="collection-item">Sombra em Pó: 3 unidades</li>
                                                <li className="collection-item">Esmalte Duradouro: 1 unidade</li>
                                                
                                            </ul>
                                            <p><a href="/listagem#produtoTab">Visualizar a lista completa</a></p>
                                        </div>
                                        {/* Tab Masculino */}
                                        <div id="masculino">
                                            <ul className="collection">
                                                <li className="collection-item">Perfume Masculino: 2 unidades</li>
                                                <li className="collection-item">Creme Anti-Idade: 1 unidade</li>
                                                <li className="collection-item">Esmalte Duradouro: 1 unidade</li>
                                                <li className="collection-item">Perfume Unissex: 1 unidade</li>
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