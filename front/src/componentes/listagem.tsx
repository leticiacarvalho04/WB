import React, { Component, useEffect, useState } from "react";
import './listagem.css';
import axios from "axios";

interface Cliente{
    nome: string;
    produtosConsumidos: number;
    servicosConsumidos:number;
}

interface Produto{
    produtoNome: string;
    count: number;
}

interface Servico{
    servicoNome: string;
    count: number;
}

interface State {
    activeTab: string;
    top10Clientes: Cliente[];
    low10Clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
    produtosGeneroFeminino: Produto[];
    produtosGeneroMasculino: Produto[];
    servicosGeneroFeminino: Servico[];
    servicosGeneroMasculino: Servico[];
}

export class Listagem extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeTab: "produto",
            top10Clientes: [],
            low10Clientes: [],
            produtos: [],
            servicos: [],
            produtosGeneroFeminino: [],
            produtosGeneroMasculino: [],
            servicosGeneroFeminino: [],
            servicosGeneroMasculino: []
        };
    }

    fetchClientesMaisConsumidores = () => {
        axios.get("/clientes/maisConsumidores")
            .then((response) => {
                console.log(response.data);
                this.setState({ top10Clientes: response.data });
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    };

    handleTabClick = (tabName: string) => {
        this.setState({ activeTab: tabName });
    };

    clientesMenosConsumidores = () => {
        axios.get('/clientes/menosConsumidores')
        .then((response) => {
            console.log(response.data);
            this.setState({ low10Clientes: response.data });
            })
        .catch((error) => {
            console.error("Erro ao buscar os dados:", error);
        });
    };

    produto = ()=>{
        axios.get('/produtos')
        .then((response)=>{
            console.log(response.data);
            this.setState({ produtos: response.data });
        }).catch((err)=>console.log(err))
    }

    servicos = ()=>{
        axios.get('/servicos')
        .then((response)=>{
            console.log(response.data);
            this.setState({ servicos: response.data });
        }).catch((err)=>console.log(err))
    }

    produtosGeneroFeminino = () => {
        axios.get('http://localhost:5001/produtos/maisConsumidosPorGenero/Feminino')
            .then((response) => {
                const produtosConsumidos: Produto[] = response.data.map((item: any) => ({
                    nome: item.produtoNome,
                    count: item.count
                }));
                this.setState({ produtos: produtosConsumidos });
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });

    }

    produtosGeneroMasculino = () => {
        axios.get('http://localhost:5001/produtos/maisConsumidosPorGenero/Masculino')
            .then((response) => {
                const produtosConsumidos: Produto[] = response.data.map((item: any) => ({
                    nome: item.produtoNome,
                    count: item.count
                }));
                this.setState({ produtos: produtosConsumidos });
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }

    servicosGeneroFeminino = () => {
        axios.get('/servicos/maisConsumidosPorGenero/Feminino')
            .then((response) => {
                console.log(response.data);
                this.setState({ servicosGeneroFeminino: response.data });
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }

    servicosGeneroMasculino = () => {
        axios.get('/servicos/maisConsumidosPorGenero/Masculino')
            .then((response) => {
                console.log(response.data);
                this.setState({ servicosGeneroMasculino: response.data });
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados:", error);
            });
    }

    componentDidMount(){
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
        this.produto();
        this.servicos();
        this.produtosGeneroFeminino();
        this.produtosGeneroMasculino();
        this.servicosGeneroFeminino();
        this.servicosGeneroMasculino();
    }

    render() {
        
        return (
            <>
            <div className="row center-align">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s4" onClick={() => this.handleTabClick('produto')}>
                            <a className={this.state.activeTab === 'produto' ? 'active' : ''} href="#produtoTab">Listagem Produto</a>
                        </li>
                        <li className="tab col s4" onClick={() => this.handleTabClick('servico')}>
                            <a className={this.state.activeTab === 'servico' ? 'active' : ''} href="#servicoTab">Listagem Serviço</a>
                        </li>
                        <li className="tab col s4" onClick={() => this.handleTabClick('cliente')}>
                            <a className={this.state.activeTab === 'cliente' ? 'active' : ''} href="#clienteTab">Listagens Relacionadas aos Clientes</a>
                        </li>
                    </ul>
                </div>
                <div id="produtoTab" className={`col s12 ${this.state.activeTab === 'produto' ? 'active' : ''}`}>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Listar Produto</span>
                            {this.produto()}
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                        <span className="card-title">Produtos mais consumidos por gênero</span>
                        {this.produtosGeneroFeminino()}
                        {this.produtosGeneroMasculino()}
                        </div>
                    </div>
                </div>
                <div id="servicoTab" className={`col s12 ${this.state.activeTab === 'servico' ? 'active' : ''}`}>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Listar serviços</span>
                            {this.servicos()}
                        </div>
                        <div className="row" style={{ marginBottom: '20px' }}></div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                        <span className="card-title">Serviços mais consumidos por gênero</span>
                        {this.servicosGeneroFeminino()}
                        {this.servicosGeneroMasculino()}
                        </div>
                    </div>
                </div>
                </div>
                <div id="clienteTab" className={`col s12 ${this.state.activeTab === 'cliente' ? 'active' : ''}`}>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Top 10 clientes que mais consumiram</span>
                        <ul className="collection">
                            {this.state.top10Clientes.map((cliente: Cliente, index: number) => (
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
                            {this.state.low10Clientes.map((cliente: Cliente, index: number) => (
                                <li key={index} className="collection-item">
                                    {cliente.nome}: {cliente.produtosConsumidos + cliente.servicosConsumidos} unidades
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
                </>
        );
    }
}
