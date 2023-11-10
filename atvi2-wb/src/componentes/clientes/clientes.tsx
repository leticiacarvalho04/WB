import React, { useState } from 'react';
import './clientes.css'

const clientes = [
  { nome:'Ana Clara', genero:'feminino'},
  { nome:'Park Sunghoon', genero: 'masculino' },
  { nome:'Audrey Duarte', genero: 'feminino' },
  { nome:'João Silva', genero: 'masculino' },
  { nome:'Maria Oliveira', genero: 'feminino'},
  { nome:'Carlos Pereira', genero:'masculino'},
  { nome:'Laura Souza', genero:'feminino'},
  { nome:'Pedro Santos', genero:'masculino'},
  { nome:'Juliana Oliveira', genero:'feminino'},
  { nome:'Lucas Silva', genero:'masculino'},
  { nome:'Fernanda Pereira', genero:'feminino'},
  { nome:'Rafaela Oliveira', genero:'feminino'},
  { nome:'Gustavo Souza', genero:'masculino'},
  { nome:'Amanda Silva', genero: 'feminino'},
  { nome:'Daniel Pereira', genero: 'masculino'},
  { nome:'Luciana Oliveira', genero:'feminino'},
  { nome:'Luiz Oliveira', genero:'masculino'},
  { nome:'Camila Souza', genero:'feminino'},
  { nome:'Mateus Silva', genero:'masculino'},
  { nome:'Beatriz Pereira', genero:'feminino'},
  { nome:'Enzo Oliveira', genero: 'masculino'},
  { nome:'Larissa Silva', genero:'feminino'},
  { nome:'Lucas Pereira', genero:'masculino'},
  { nome:'Isabela Oliveira', genero:'feminino'},
  { nome:'Carolina Silva', genero:'feminino'},
  { nome:'Guilherme Oliveira', genero:'masculino'},
  { nome:'Julia Silva', genero:'feminino'},
  { nome:'Ricardo Pereira', genero:'masculino'}
];

function Clientes() {
  const [tab, setTab] = useState(0);

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className={`tab col s4 ${tab === 0 ? 'active' : ''}`}>
                  <a href="#test1" onClick={() => setTab(0)}>
                    Todos
                  </a>
                </li>
                <li className={`tab col s4 ${tab === 1 ? 'active' : ''}`}>
                  <a href="#test2" onClick={() => setTab(1)}>
                    Masculinos
                  </a>
                </li>
                <li className={`tab col s4 ${tab === 2 ? 'active' : ''}`}>
                  <a href="#test3" onClick={() => setTab(2)}>
                    Femininos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div id="test1" className="col s12">
            {tab === 0 &&
              clientes.map((cliente, i) => (
                <div key={i} className="card">
                  <div className="card-content">
                    <ul className="card-title">{cliente.nome}</ul>
                    <p>{cliente.genero}</p>
                  </div>
                </div>
              ))}
          </div>

          <div id="test2" className="col s12">
            {tab === 1 &&
              clientes
                .filter((cliente) => cliente.genero === 'masculino')
                .map((cliente, i) => (
                  <div key={i} className="card">
                    <div className="card-content">
                      <span className="card-title">{cliente.nome}</span>
                      <p>{cliente.genero}</p>
                    </div>
                  </div>
                ))}
          </div>

          <div id="test3" className="col s12">
            {tab === 2 &&
              clientes
                .filter((cliente) => cliente.genero === 'feminino')
                .map((cliente, i) => (
                  <div key={i} className="card">
                    <div className="card-content">
                      <span className="card-title">{cliente.nome}</span>
                      <p>{cliente.genero}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clientes;