import React, { useState, useEffect, useRef } from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import './home.css';

export default function Home(props) {
    const [tema, setTema] = useState(props.tema);
    const tabs = useRef(null);

    useEffect(() => {
        M.Tabs.init(tabs.current);
    }, []);

    const clientesMaisConsumidores = [
        { nome: 'Maria Oliveira', quantidade: 25 },
        { nome: 'Mariana Santos', quantidade: 20 },
        { nome: 'Audrey Duarte', quantidade: 18 },
        { nome: 'Juliana Oliveira', quantidade: 15 },
        { nome: 'Ana Clara', quantidade: 12 },
    ];

    const clientesOrdenados = clientesMaisConsumidores.sort((a, b) => b.quantidade - a.quantidade);

    const top10Clientes = clientesOrdenados.slice(0, 10);

    let estiloBotao = `btn waves-effect waves-light ${props.tema}`;
    return (
        <div className="cards-container">
            <div className="row center-align">
                <div className="dois">
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Clientes Mais Consumidores</span>
                            <ul className="collection">
                                {top10Clientes.map((cliente, index) => (
                                    <li key={index} className="collection-item">{cliente.nome}: {cliente.quantidade} unidades</li>
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
                                <ul ref={tabs} className="tabs tabs-fixed-width">
                                    <li className="tab"><a href="#produtos">Produtos</a></li>
                                    <li className="tab"><a href="#servicos">Serviços</a></li>
                                </ul>
                            </div>
                            <div className="row">
                                <div id="produtos" className="col s12">
                                    <ul className="collection">
                                        <li className="collection-item">Perfume feminino: 2 unidades</li>
                                        <li className="collection-item">Batom matte: 3 unidades</li>
                                        <li className="collection-item">Sombra em pó: 3 unidades</li>
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
    );
}