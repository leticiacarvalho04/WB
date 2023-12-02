import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Produto {
  nome: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
}

export default function FormularioAtualizacaoProduto() {
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<Produto>({
    nome: '',
    descricao: '',
    preco: 0,
    quantidadeEstoque: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [id]: value,
    }));
  };

  useEffect(() => {
    const carregarDetalhesProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/produto/id/${id}`);
        const produtoCarregado: Produto = response.data;

        // Atualiza o estado do produto com os detalhes carregados
        setProduto(produtoCarregado);
      } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error);
      }
    };

    carregarDetalhesProduto();
  }, [id]);

  const handleAtualizarClick = async () => {
    try {
        const response = await axios.put(`http://localhost:5001/produto/id/${id}`,produto);
        console.log(response.data);
        alert(`Produto atualizado!`)
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Atualizar Produto</span>
        <div className="input-field col s12">
          <input
            id="nome"
            type="text"
            value={produto.nome}
            onChange={handleInputChange}
          />
          <label htmlFor="nome">Nome do Produto</label>
        </div>
        <div className="input-field col s12">
          <textarea
            id="descricao"
            className="materialize-textarea"
            value={produto.descricao}
            onChange={handleInputChange}
          ></textarea>
          <label htmlFor="descricao">Descrição</label>
        </div>
        <div className="input-field col s12">
          <input
            id="preco"
            type="number"
            value={produto.preco}
            onChange={handleInputChange}
          />
          <label htmlFor="preco">Preço</label>
        </div>
        <div className="input-field col s12">
          <input
            id="quantidadeEstoque"
            type="number"
            value={produto.quantidadeEstoque}
            onChange={handleInputChange}
          />
          <label htmlFor="quantidadeEstoque">Quantidade em Estoque</label>
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