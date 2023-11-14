import React, { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

export default function FormularioCadastroCliente(props) {
    const [quantidadeRg, setQuantidadeRg] = useState(0);
    const [tema, setTema] = useState(props.tema);

    useEffect(() => {
        M.AutoInit();
    }, []);
      
    const handleQuantidadeRgChange = (event) => {
        setQuantidadeRg(parseInt(event.target.value, 10));
    };    

    let estiloBotao = `btn waves-effect waves-light ${props.tema}`;
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="nome" type="text" className="validate" />
                            <label htmlFor="nome">Nome</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="nome_social" type="text" className="validate" />
                            <label htmlFor="nome_social">Nome social</label>
                        </div>
                        <label htmlFor="genero">Gênero</label>
                        <div className="input-field col s12">
                            <select id="genero" className="browser-default">
                                <option value="" disabled>Escolha o gênero</option>
                                <option value="1">Masculino</option>
                                <option value="2">Feminino</option>
                                <option value="3">Outro</option>
                            </select>
                        </div>
                        <div className="input-field col s12">
                            <input id="cpf" type="text" className="validate" />
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
                                <input id={`rg_${i}`} type="text" className="validate" />
                                <label htmlFor={`rg_${i}`}>Digite o n° do RG {i + 1}</label>
                            </div>
                        ))}
                        <div className="input-field col s12">
                            <input id="data_emissao_rg" type="text" className="validate" />
                            <label htmlFor="data_emissao_rg">Data de emissão do RG</label>
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