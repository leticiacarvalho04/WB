import React, { useEffect, useState } from 'react';
import './clientes.css'
import axios from 'axios';

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

interface Telefone {
  ddd: string;
  numero: string;
}

interface RG {
  valor: string;
}

interface CPF{
  valor: string
}

interface listaCliente {
  nome: string;
  genero: string;
  cpf: CPF;
  rgs: RG[];
  telefone: Telefone[];
}

interface ClienteMulher{
  nome: string;
  genero: string;
  cpf: CPF;
  rgs: RG[];
  telefone: Telefone[];
}

interface ClienteHomem{
  nome: string;
  genero: string;
  cpf: CPF;
  rgs: RG[];
  telefone: Telefone[];
}

export default function Clientes() {
  const [tab, setTab] = useState(0);
  const [listaCliente, setListaCliente] = useState<listaCliente[]>([])
  const [ clienteMulher, setClienteMulher ] = useState<ClienteMulher[]>([])
  const [ clienteHomem, setClienteHomem ] = useState<ClienteHomem[]>([])

  useEffect(() => {
    lista();
    clienteFeminino();
    clienteMasculino();
}, []);

  const lista = () => {
    axios.get('http://localhost:32832/clientes')
    .then((response) => {
      console.log(response.data)
      setListaCliente(response.data);
    })
    .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
    });
  }

  const clienteFeminino = ()=>{
    axios.get('http://localhost:32832/clientes/genero/Feminino')
    .then((response) => {
      console.log(response.data)
      setClienteMulher(response.data);
    })
    .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
    });
  }

  const clienteMasculino = ()=>{
    axios.get('http://localhost:32832/clientes/genero/Masculino')
    .then((response) => {
      console.log(response.data)
      setClienteHomem(response.data);
    })
    .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
    });
  }

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
              listaCliente.map((cliente, index) => (
                <div key={index} className="card">
                  <div className="card-content">
                    <span className="card-title">{cliente.nome}</span>
                    <p>Gênero: {cliente.genero}</p>
                    <p>CPF: {cliente.cpf.valor}</p>
                    <p>RG: {cliente.rgs && cliente.rgs.map(rgs => rgs.valor).join(', ')}</p>
                    <p>Telefone: {cliente.telefone && cliente.telefone.map(tel => `(${tel.ddd})${tel.numero}`).join(', ')}</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div id="test2" className="col s12">
            {tab === 1 &&
              clienteHomem.map((cliente, index) => (
                <div key={index} className="card">
                  <div className="card-content">
                    <span className="card-title">{cliente.nome}</span>
                    <p>Gênero: {cliente.genero}</p>
                    <p>CPF: {cliente.cpf.valor}</p>
                    <p>RG: {cliente.rgs && cliente.rgs.map(rgs => rgs.valor).join(', ')}</p>
                    <p>Telefone: {cliente.telefone && cliente.telefone.map(tel => `(${tel.ddd})${tel.numero}`).join(', ')}</p>
                  </div>
                </div>
              ))
            }
          </div>

          <div id="test3" className="col s12">
            {tab === 2 &&
              clienteMulher.map((cliente, index) => (
                <div key={index} className="card">
                  <div className="card-content">
                    <span className="card-title">{cliente.nome}</span>
                    <p>Gênero: {cliente.genero}</p>
                    <p>CPF: {cliente.cpf.valor}</p>
                    <p>RG: {cliente.rgs && cliente.rgs.map(rgs => rgs.valor).join(', ')}</p>
                    <p>Telefone: {cliente.telefone && cliente.telefone.map(tel => `(${tel.ddd})${tel.numero}`).join(', ')}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}