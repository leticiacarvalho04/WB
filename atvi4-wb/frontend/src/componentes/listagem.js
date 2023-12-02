import React, { useState, useEffect } from "react";
import './listagem.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const servicos = [
  { id: '1', nome: 'Corte de cabelo', preco: 50.0, genero: 'unissex' },
  { id: '2', nome: 'Manicure', preco: 20.0, genero: 'feminino' },
  { id: '3', nome: 'Pedicure', preco: 25.0, genero: 'feminino' },
  // adicione mais serviços conforme necessário
];

const produtos = [
  { id: '1', nome: 'Perfume feminino', preco: 100.0, genero: 'feminino' },
  { id: '2', nome: 'Batom matte', preco: 15.0, genero: 'feminino' },
  { id: '3', nome: 'Perfume masculino', preco: 120.0, genero: 'masculino' },
  // adicione mais produtos conforme necessário
];

const clientes = [
  { id: '1', nome: 'Maria Oliveira', quantidadeConsumida: 25, genero: 'feminino' },
  { id: '2', nome: 'Mariana Santos', quantidadeConsumida: 20, genero: 'feminino' },
  { id: '3', nome: 'Audrey Duarte', quantidadeConsumida: 18, genero: 'feminino' },
  // adicione mais clientes conforme necessário
];

export default function Listagem(props) {
  const [activeTab, setActiveTab] = useState('produto');
  const [id, setId] = useState(props.id);
  const [nome, setNome] = useState('');
  const [tema, setTema] = useState(props.tema);

  const calcularMaisConsumidosPorGenero = (itens) => {
    const contagemPorGenero = {};

    itens.forEach(item => {
      contagemPorGenero[item.genero] = (contagemPorGenero[item.genero] || 0) + 1;
    });

    return contagemPorGenero;
  };

  const obterMaisConsumidosPorGenero = (itens) => {
    const contagemPorGenero = calcularMaisConsumidosPorGenero(itens);

    const itensPorGenero = {};
    itens.forEach(item => {
      if (!itensPorGenero[item.genero]) {
        itensPorGenero[item.genero] = [];
      }
      itensPorGenero[item.genero].push(item);
    });

    return itensPorGenero;
  };

  const obterClientesMenosConsumidores = (clientes) => {
    const clientesOrdenados = clientes.sort((a, b) => a.quantidadeConsumida - b.quantidadeConsumida);

    const clientesMenosConsumidores = clientesOrdenados.slice(0, 10).reverse();

    return clientesMenosConsumidores;
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
  }, []);

  const renderLista = (itens) => (
    <ul>
      {itens.map(item => (
        <li key={item.id}>
          {`${item.id} - ${item.nome} - ${item.preco ? item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : item.quantidadeConsumida + ' unidades'}`}
        </li>
      ))}
    </ul>
  );

  const obterClientesMaisConsumidores = (clientes) => {
    const clientesOrdenados = clientes.sort((a, b) => b.quantidadeConsumida - a.quantidadeConsumida);

    const clientesMaisConsumidores = clientesOrdenados.slice(0, 10);

    return clientesMaisConsumidores;
  };

  const itensMaisConsumidosPorGenero = obterMaisConsumidosPorGenero(
    activeTab === 'produto' ? produtos :
      activeTab === 'servico' ? servicos :
        clientes
  );

  const clientesMenosConsumidores = obterClientesMenosConsumidores(clientes);

  const clientesMaisConsumidores = obterClientesMaisConsumidores(clientes);

  return (
    <div className="row center-align">
      <div className="col s12">
        <ul className="tabs">
          <li className="tab col s4" onClick={() => handleTabClick('produto')}>
            <a className={activeTab === 'produto' ? 'active' : ''} href="#produtoTab">Listagem Produto</a>
          </li>
          <li className="tab col s4" onClick={() => handleTabClick('servico')}>
            <a className={activeTab === 'servico' ? 'active' : ''} href="#servicoTab">Listagem Serviço</a>
          </li>
          <li className="tab col s4" onClick={() => handleTabClick('cliente')}>
            <a className={activeTab === 'cliente' ? 'active' : ''} href="#clienteTab">Listagem Cliente</a>
          </li>
        </ul>
      </div>
    </div>
  );
}