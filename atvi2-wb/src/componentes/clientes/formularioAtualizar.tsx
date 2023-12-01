import React, { useState } from "react";
import { useParams } from "react-router-dom";

const estiloBotao = `btn waves-effect waves-light purple darken-2 deep-purple lighten-2`;

const isCpfValid = (cpf: string): boolean => {
  return cpf.length === 11;
};

const isPhoneNumberValid = (phone: string): boolean => {
  return phone.length === 11;
};

const isRgValid = (rg: string): boolean => {
  return rg.length === 9;
};

interface FormData {
  nome: string;
  nome_social: string;
  genero: string;
  cpf: string;
  data_emissao_cpf: string;
  quantidade_rg: string;
  rg: string;
  data_emissao_rg: string;
  telefone: string;
}

const FormularioAtualizacaoCliente: React.FC = () => {
  const { idCliente } = useParams();
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    nome_social: "",
    genero: "",
    cpf: "",
    data_emissao_cpf: "",
    quantidade_rg: "",
    rg: "",
    data_emissao_rg: "",
    telefone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAtualizarClick = () => {
    if (!isCpfValid(formData.cpf)) {
      alert('CPF inválido!');
      return;
    }

    if (!isPhoneNumberValid(formData.telefone)) {
      alert('Telefone inválido!');
      return;
    }

    if (!isRgValid(formData.rg)) {
      alert('RG inválido!');
      return;
    }

    alert('Cliente Atualizado!');
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Atualizar Cadastro</span>
        <div className="input-field col s12">
          <input
            id="nome"
            type="text"
            value={formData.nome}
            onChange={handleInputChange}
          />
          <label htmlFor="nome">Nome</label>
        </div>
        <div className="input-field col s12">
          <input
            id="nome_social"
            type="text"
            className="validate"
            value={formData.nome_social}
            onChange={handleInputChange}
          />
          <label htmlFor="nome_social">Nome social</label>
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
            onChange={(e) => handleInputChange(e)}
            className="browser-default"
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="input-field col s12">
          <input
            id="cpf"
            type="text"
            className="validate"
            value={formData.cpf}
            onChange={handleInputChange}
          />
          <label htmlFor="cpf">CPF</label>
        </div>
        <div className="input-field col s12">
          <input
            id="rg"
            type="text"
            className="validate"
            value={formData.rg}
            onChange={handleInputChange}
          />
          <label htmlFor="rg">RG</label>
        </div>
        <div className="input-field col s12">
          <input
            id="telefone"
            type="text"
            className="validate"
            value={formData.telefone}
            onChange={handleInputChange}
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
