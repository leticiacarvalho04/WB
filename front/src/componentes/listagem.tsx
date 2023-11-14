import React, { Component } from "react";
import './listagem.css'

type Props = {
    id: string;
    tema: string;
  };
  
  interface Produto {
    id: string;
    nome: string;
    preco: number;
    genero: string; // Adicionado campo de gênero
  }
  
  interface Servico {
    id: string;
    nome: string;
    preco: number;
    genero: string; // Adicionado campo de gênero
  }
  
  interface Cliente {
    id: string;
    nome: string;
    quantidadeConsumida: number;
    genero: string; // Adicionado campo de gênero
  }
  
  interface State {
    activeTab: string;
    id: string;
    nome: string;
    tema: string;
  }
  
  const servicos: Servico[] = [
    { id: '1', nome: 'Corte de cabelo', preco: 50.0, genero: 'unissex' },
    { id: '2', nome: 'Manicure', preco: 20.0, genero: 'feminino' },
    { id: '3', nome: 'Pedicure', preco: 25.0, genero: 'feminino' },
    // adicione mais serviços conforme necessário
  ];
  
  const produtos: Produto[] = [
    { id: '1', nome: 'Perfume feminino', preco: 100.0, genero: 'feminino' },
    { id: '2', nome: 'Batom matte', preco: 15.0, genero: 'feminino' },
    { id: '3', nome: 'Perfume masculino', preco: 120.0, genero: 'masculino' },
    // adicione mais produtos conforme necessário
  ];
  
  const clientes: Cliente[] = [
    { id: '1', nome: 'Maria Oliveira', quantidadeConsumida: 25, genero: 'feminino' },
    { id: '2', nome: 'Mariana Santos', quantidadeConsumida: 20, genero: 'feminino' },
    { id: '3', nome: 'Audrey Duarte', quantidadeConsumida: 18, genero: 'feminino' },
    // adicione mais clientes conforme necessário
  ];

export class Listagem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            activeTab: 'produto',
            id: props.id,
            nome: '',
            tema: props.tema,
        };
    }

    calcularMaisConsumidosPorGenero = (itens: { genero: string }[]) => {
        const contagemPorGenero: { [key: string]: number } = {};
    
        itens.forEach(item => {
          contagemPorGenero[item.genero] = (contagemPorGenero[item.genero] || 0) + 1;
        });
    
        return contagemPorGenero;
      };
    
      // Função para obter os itens mais consumidos por gênero
      obterMaisConsumidosPorGenero = (itens: { id: string, nome: string, preco?: number, quantidadeConsumida?: number, genero: string }[]) => {
        const contagemPorGenero = this.calcularMaisConsumidosPorGenero(itens);
    
        // Filtra os itens para cada gênero
        const itensPorGenero: { [key: string]: { id: string, nome: string, preco?: number, quantidadeConsumida?: number }[] } = {};
        itens.forEach(item => {
          if (!itensPorGenero[item.genero]) {
            itensPorGenero[item.genero] = [];
          }
          itensPorGenero[item.genero].push(item);
        });
    
        return itensPorGenero;
      };

      obterClientesMenosConsumidores = (clientes: Cliente[]) => {
        // Ordena os clientes pelo total de consumo em ordem crescente
        const clientesOrdenados = clientes.sort((a, b) => a.quantidadeConsumida - b.quantidadeConsumida);
    
        // Inverte a ordem para obter do menor para o maior consumo
        const clientesMenosConsumidores = clientesOrdenados.slice(0, 10).reverse();
    
        return clientesMenosConsumidores;
      };

    handleTabClick = (tabName: string) => {
        this.setState({
            activeTab: tabName
        });
    };

    componentDidMount() {
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);
    }

    renderLista = (itens: { id: string, nome: string, preco?: number, quantidadeConsumida?: number }[]) => (
        <ul>
            {itens.map(item => (
                <li key={item.id}>
                    {`${item.id} - ${item.nome} - ${item.preco ? item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : item.quantidadeConsumida + ' unidades'}`}
                </li>
            ))}
        </ul>
    );

    obterClientesMaisConsumidores = (clientes: Cliente[]) => {
        // Ordena os clientes pelo total de consumo em ordem decrescente
        const clientesOrdenados = clientes.sort((a, b) => b.quantidadeConsumida - a.quantidadeConsumida);
    
        // Seleciona os primeiros 10 clientes (os que mais consumiram)
        const clientesMaisConsumidores = clientesOrdenados.slice(0, 10);
    
        return clientesMaisConsumidores;
      };

    render() {
        const itensMaisConsumidosPorGenero = this.obterMaisConsumidosPorGenero(
            this.state.activeTab === 'produto' ? produtos :
              this.state.activeTab === 'servico' ? servicos :
                clientes
          );

          const clientesMenosConsumidores = this.obterClientesMenosConsumidores(clientes);

          const clientesMaisConsumidores = this.obterClientesMaisConsumidores(clientes);

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
                            {this.renderLista(produtos)}
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                        <span className="card-title">Produtos mais consumidos por gênero</span>
                        {Object.keys(itensMaisConsumidosPorGenero).map((genero, index) => (
                            <div key={index}>
                            <h5>{genero}</h5>
                            {this.renderLista(itensMaisConsumidosPorGenero[genero])}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div id="servicoTab" className={`col s12 ${this.state.activeTab === 'servico' ? 'active' : ''}`}>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Listar serviços</span>
                            {this.renderLista(servicos)}
                        </div>
                        <div className="row" style={{ marginBottom: '20px' }}></div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                        <span className="card-title">Serviços mais consumidos por gênero</span>
                        {Object.keys(itensMaisConsumidosPorGenero).map((genero, index) => (
                            <div key={index}>
                            <h5>{genero}</h5>
                            {this.renderLista(itensMaisConsumidosPorGenero[genero])}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                </div>
                <div id="clienteTab" className={`col s12 ${this.state.activeTab === 'cliente' ? 'active' : ''}`}>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Top 10 clientes que mais consumiram</span>
                            {this.renderLista(clientesMaisConsumidores)}
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <span className="card-title">Top 10 clientes que menos consumiram</span>
                            {this.renderLista(clientesMenosConsumidores)}
                        </div>
                    </div>
                </div>
                </>
        );
    }
}