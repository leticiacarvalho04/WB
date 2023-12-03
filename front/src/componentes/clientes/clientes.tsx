import React, { useEffect, useState } from 'react';
import './clientes.css'
import axios from 'axios';

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
    axios.get('http://localhost:5001/clientes')
    .then((response) => {
      console.log(response.data)
      setListaCliente(response.data);
    })
    .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
    });
  }

  const clienteFeminino = ()=>{
    axios.get('http://localhost:5001/clientes/genero/Feminino')
    .then((response) => {
      console.log(response.data)
      setClienteMulher(response.data);
    })
    .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
    });
  }

  const clienteMasculino = ()=>{
    axios.get('http://localhost:5001/clientes/genero/Masculino')
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