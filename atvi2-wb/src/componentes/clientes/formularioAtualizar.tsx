import React, { Component } from "react";

const estiloBotao = `btn waves-effect waves-light purple darken-2 deep-purple lighten-2`;

export default function FormularioAtualizacaoCliente() {
        return(
        <div className="card">
                <div className="card-content">
                    <span className="card-title">Atualizar Cadastro</span>
                    <div className="input-field col s12">
                        <input id="nome" type="text" />
                        <label htmlFor="nome">Nome</label>
                        </div>
                            <div className="input-field col s12">
                                <input id="nome_social" type="text" className="validate" />
                                <label htmlFor="nome_social">Nome social</label>
                            </div>
                            <div className="input-field col s12">
                            <option value="" disabled>Gênero</option>
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
                                <input id="quantidade_rg" type="text" className="validate" />
                                <label htmlFor="quantidade_rg">Quantidade de RG</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="rg" type="text" className="validate" />
                                <label htmlFor="rg">N° de RG</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="data_emissao_rg" type="text" className="validate" />
                                <label htmlFor="data_emissao_rg">Data de emissão do RG</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="telefone" type="text" className="validate" />
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col s12">
                                <button className={estiloBotao} type="submit" name="action">
                                Submit
                                <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </div>
        )
    }