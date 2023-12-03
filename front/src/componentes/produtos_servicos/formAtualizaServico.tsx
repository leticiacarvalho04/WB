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
    const [servico, setServicos] = useState<Servicos>({
    name: '',
    descricao: '',
    price: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setServicos((prevServicos) => ({
      ...prevServicos,
      [id]: value,
    }));
  };

  useEffect(() => {
    const carregarDetalhesServicos = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/servicos/id/${id}`);
        const servicoCarregado: Servicos = response.data;

        // Atualiza o estado do servico com os detalhes carregados
        setServicos(servicoCarregado);
      } catch (error) {
        console.error('Erro ao carregar detalhes do servico:', error);
      }
    };

    carregarDetalhesServicos();
  }, [id]);

  const handleAtualizarClick = async () => {
    try {
      const response = await axios.put(`http://localhost:5001/servico/id/${id}`, servico);
      console.log(response.data);
      alert(`Servicos atualizado!`)
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Atualizar Servicos</span>
        <div className="input-field col s12">
          <input
            id="name"
            type="text"
            value={servico.name}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Nome do Servicos</label>
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