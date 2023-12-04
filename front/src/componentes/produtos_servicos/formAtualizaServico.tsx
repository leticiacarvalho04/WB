import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Servicos {
  name: string;
  descricao: string;
  price: number;
}

export default function FormularioAtualizacaoServicos() {
  const { id } = useParams<{ id: string }>();
  const [servico, setServico] = useState<Servicos>({
    name: '',
    descricao: '',
    price: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
  
    // Convert price to a number
    const newValue = id === 'price' ? parseFloat(value) : value;
  
    setServico((prevServico) => ({
      ...prevServico,
      [id]: newValue,
    }));
  };
  

  useEffect(() => {
    const carregarDetalhesServico = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/servicos/id/${id}`);
        const servicoCarregado: Servicos = response.data;

        // Atualiza o estado do servico com os detalhes carregados
        setServico(servicoCarregado);
      } catch (error) {
        console.error('Erro ao carregar detalhes do serviço:', error);
      }
    };

    carregarDetalhesServico();
  }, [id]);

  const handleAtualizarClick = async () => {
    try {
      const dataToSend = {
        name: servico.name,
        preco: servico.price,
        descricao: servico.descricao
      };
  
      const response = await axios.put(`http://localhost:5001/servico/id/${id}`, dataToSend);
      console.log(response.data);
      alert(`Serviço atualizado!`);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
    }
  };  

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Atualizar Serviço</span>
        <div className="input-field col s12">
          <input
            id="name"
            type="text"
            value={servico.name}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Nome do Serviço</label>
        </div>
        <div className="input-field col s12">
          <textarea
            id="descricao"
            className="materialize-textarea"
            value={servico.descricao}
            onChange={handleInputChange}
          ></textarea>
          <label htmlFor="descricao">Descrição</label>
        </div>
        <div className="input-field col s12">
          <input
            id="price"
            type="number"
            value={servico.price}
            onChange={handleInputChange}
          />
          <label htmlFor="price">Preço</label>
        </div>
        <div className="row">
          <div className="col s12">
            <button className="btn waves-effect waves-light" onClick={handleAtualizarClick}>
              Atualizar
              <i className="material-icons right">edit</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};