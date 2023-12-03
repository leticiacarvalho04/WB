import React, { useState } from "react";
import axios from "axios";

export default function FormularioCadastroCliente() {
  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [genero, setGenero] = useState("");
  const [ddd,setDdd] = useState("")
  const [numeroTelefone, setNumeroTelefone] = useState("");
  const [cpfValor, setCpfValor] = useState("");
  const [dataEmissaoValor, setDataEmissaoValor] = useState("");
  const [rgValor, setRgValor] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [quantidadeRg, setQuantidadeRg] = useState(0);

  const handleQuantidadeRgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantidadeRg(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      // Enviar o CPF
      const cpfResponse = await axios.post('http://localhost:5001/cpfs', {
        valor: cpfValor,
      });
      const cpfId = cpfResponse.data.id;
  
      // Enviar os RGs
      const rgIds = [];
      for (let i = 0; i < quantidadeRg; i++) {
        const rgResponse = await axios.post('http://localhost:5001/rgs', {
          valor: rgValor[i],
          dataEmissao: dataEmissaoValor[i]
        });
        rgIds.push(rgResponse.data.id);
      }
  
      // Enviar o telefone
      const telefoneResponse = await axios.post('http://localhost:5001/telefones', {
        numero: numeroTelefone,
        ddd: ddd
      });
      const telefoneId = telefoneResponse.data.id;
  
      // Enviar o cliente com todas as informações relacionadas
      const clienteResponse = await axios.post('http://localhost:5001/cadastroCli', {
        nome,
        nomeSocial,
        genero,
        numeroTelefone: telefoneId,
        cpfValor: cpfId,
        rgValor: rgIds,
      });
  
      console.log('Cliente cadastrado:', clienteResponse.data);
    } catch (error) {
      console.error('Erro ao cadastrar o cliente:', error);
    }
  };  

  let estiloBotao = `btn waves-effect waves-light`;

    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <form className="col s12" onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="nome" type="text" className="validate" value={nome} onChange={(e) => setNome(e.target.value)} />
                <label htmlFor="nome">Nome</label>
              </div>
              <div className="input-field col s12">
                <input id="nome_social" type="text" className="validate" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} />
                <label htmlFor="nome_social">Nome social</label>
              </div>
              <label htmlFor="genero">Gênero</label>
              <div className="input-field col s12">
                <select id="genero" className="browser-default">
                  <option value="" disabled>Escolha o gênero</option>
                  <option value="1">Masculino</option>
                  <option value="2">Feminino</option>
                </select>
              </div>
              <div className="input-field col s12">
                <input id="cpf" type="text" className="validate" value={cpfValor} onChange={(e) => setCpfValor(e.target.value)} />
                <label htmlFor="cpf">N° CPF</label>
              </div>
              <div className="input-field col s12">
                <input id="data_emissao_cpf" type="text" className="validate" />
                <label htmlFor="data_emissao_cpf">Data de emissão do CPF</label>
              </div>
              <div className="input-field col s12">
                <input id="quantidade_rg" type="text" className="validate" onChange={handleQuantidadeRgChange} />
                <label htmlFor="quantidade_rg">Quantidade de RG</label>
              </div>
              {!isNaN(quantidadeRg) && [...Array(quantidadeRg)].map((_, i) => (
                  <div key={i} className="input-field col s12">
                      <input id={`rg_${i}`} type="text" className="validate" value={rgValor} onChange={(e) => setRgValor(e.target.value)} />
                      <label htmlFor={`rg_${i}`}>Digite o n° do RG {i + 1}</label>
                  </div>
              ))}
              <div className="input-field col s12">
                <input id="data_emissao_rg" type="text" className="validate" />
                <label htmlFor="data_emissao_rg">Data de emissão do RG</label>
              </div>
              <div className="input-field col s12">
                <input id="ddd" type="text" className="validate" />
                <label htmlFor="ddd">DDD</label>
              </div>
              <div className="input-field col s12">
                <input id="telefone" type="text" className="validate" />
                <label htmlFor="telefone">Telefone</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button className={estiloBotao} type="submit" name="action">
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }