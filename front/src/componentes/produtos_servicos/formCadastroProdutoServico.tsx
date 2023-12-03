import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function FormularioCadastroProduto(){
  const tabsRef = useRef(null);
  const [formData, setFormData] = useState({
    nome: "",
    name: '',
    descricao: "",
    price: 0,
    preco: 0,
    quantidadeEstoque: "",
    empresaId: "",
  });
  useEffect(() => {
    if (tabsRef.current) {
      M.Tabs.init(tabsRef.current);
    }
  }, []);

  let estiloBotao = `btn waves-effect waves-light`;

  const handleSubmitProduto = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/cadastroPro", formData);
      console.log(response.data);
      // Faça algo com a resposta, se necessário
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      // Trate o erro, se necessário
    }
  };

  const handleSubmitServico = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/cadastroServ", formData);
      console.log(response.data);
      // Faça algo com a resposta, se necessário
    } catch (error) {
      console.error("Erro ao cadastrar servico:", error);
      // Trate o erro, se necessário
    }
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="row">
      <div className="col s12">
        <ul ref={tabsRef} className="tabs">
          <li className="tab col s6">
            <a href="#cadastro-servico">Cadastro de Serviço</a>
          </li>
          <li className="tab col s6">
            <a href="#cadastro-produto">Cadastro de Produto</a>
          </li>
        </ul>
      </div>
      <div id="cadastro-produto" className="col s12">
        <div className="row">
          <div className="col s6 offset-s3">
            <form className="col s12" onSubmit={handleSubmitProduto}>              
              <div className="row">
                <div className="input-field col s12">
                <input
                  id="nome"
                  type="text"
                  className="validate"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                />
                <label htmlFor="nome">Nome</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="descricao"
                    type="text"
                    className="validate"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="descricao">Descrição</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="preco"
                    type="text"
                    className="validate"
                    name="preco"
                    value={formData.preco}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="preco">Preço de Venda</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="estoque"
                    type="text"
                    className="validate"
                    name="quantidadeEstoque"
                    value={formData.quantidadeEstoque}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="estoque">Estoque</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <button className={estiloBotao} type="submit" name="action">
                    Submit<i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="cadastro-servico" className="col s12">
        <div className="row">
          <div className="col s6 offset-s3">
            <form className="col s12" onSubmit={handleSubmitServico}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="nome"
                    type="text"
                    className="validate"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="nome">Nome</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="descricao"
                    type="text"
                    className="validate"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="descricao">Descrição</label>
                </div>
                <div className="input-field col s12">
                  <input
                    id="preco"
                    type="text"
                    className="validate"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="preco">Preço de Venda</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <button className={estiloBotao} type="submit" name="action">
                    Submit<i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};