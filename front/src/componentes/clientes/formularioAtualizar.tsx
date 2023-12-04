import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const estiloBotao = `btn waves-effect waves-light purple darken-2 deep-purple lighten-2`;

interface FormData {
  novoNome: string;
  nomeSocial: string;
  genero: string;
  cpfValor: string;
  data_emissao_cpf: string;
  quantidade_rg: string;
  rgValor: string;
  data_emissao_rg: string;
  telefones: { ddd: string; numeroTelefone: string }[]; // Modificação para lidar com um array de telefones
}

const FormularioAtualizacaoCliente: React.FC = () => {
  const { cpf } = useParams();
  const [formData, setFormData] = useState<FormData>({
    novoNome: "",
    nomeSocial: "",
    genero: "",
    cpfValor: "",
    data_emissao_cpf: "",
    quantidade_rg: "",
    rgValor: "",
    data_emissao_rg: "",
    telefones: [{ ddd: "", numeroTelefone: "" }], // Inicializa com um telefone vazio
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleAtualizarClick = async () => {

    try {
      await axios.put(`http://localhost:5001/clientes/cpf/${cpf}`, formData);
      alert("Cliente Atualizado!");
    } catch (error) {
      console.error("Erro ao atualizar o cliente:", error);
      alert(
        "Erro ao atualizar o cliente. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Atualizar Cadastro</span>
        <div className="input-field col s12">
          <input
            id="novoNome"
            type="text"
            value={formData.novoNome}
            onChange={handleInputChange}
          />
          <label htmlFor="novoNome">Novo Nome</label>
        </div>
        <div className="input-field col s12">
          <input
            id="nomeSocial"
            type="text"
            value={formData.nomeSocial}
            onChange={handleInputChange}
          />
          <label htmlFor="nomeSocial">Nome Social</label>
        </div>
        <div className="input-field col s12">
          <label htmlFor="genero" style={{ marginTop: '1rem', marginRight: '200px' }}>
            Gênero
          </label>
          <br />
          <br />
          <br />
          <select
            id="genero"
            value={formData.genero}
            onChange={handleInputChange}
            className="browser-default"
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
          </select>
        </div>
        <div className="input-field col s12">
          <input
            id="cpfValor"
            type="text"
            value={formData.cpfValor}
            onChange={handleInputChange}
          />
          <label htmlFor="cpfValor">CPF</label>
        </div>
        <div className="input-field col s12">
          <input
            id="rgValor"
            type="text"
            value={formData.rgValor}
            onChange={handleInputChange}
          />
          <label htmlFor="rgValor">RG</label>
        </div>
        <div className="input-field col s12">
          <input
            id="ddd"
            type="text"
            value={formData.telefones[0].ddd}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                telefones: [{ ...prevData.telefones[0], ddd: e.target.value }],
              }))
            }
          />
          <label htmlFor="ddd">DDD</label>
        </div>
        <div className="input-field col s12">
          <input
            id="telefone"
            type="text"
            value={formData.telefones[0].numeroTelefone}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                telefones: [{ ...prevData.telefones[0], numeroTelefone: e.target.value }],
              }))
            }
          />
          <label htmlFor="telefone">Telefone</label>
        </div>
        <div className="row">
          <div className="col s12">
            <button className={estiloBotao} onClick={handleAtualizarClick}>
              Atualizar
              <i className="material-icons right">edit</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioAtualizacaoCliente;
